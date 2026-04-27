require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const router = require("./routes/index");
const errorMiddleware = require("./middleware/error.middleware");
const userService = require("./services/user.service");
const HousesService = require("./services/houses.service");
const organisationInfoService = require("./services/organisation-info.service");
const { runMigrations } = require("./migrations/run-migrations");
const logger = require("./utils/logger");

const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;
const isProduction = process.env.NODE_ENV === "production";
const trustProxy = process.env.TRUST_PROXY === "true";

if (!CLIENT_ORIGIN) {
  throw new Error("CLIENT_ORIGIN is not set");
}

const ALLOWED_ORIGINS = CLIENT_ORIGIN.split(",").map((origin) =>
  origin.trim(),
);
const ensureSecureConfig = () => {
  if (!isProduction) {
    return;
  }
  const placeholders = [
    "change-me-access-secret",
    "change-me-refresh-secret",
    "change-me-refresh-hash-secret",
    "change-me-password",
    "change-me-rias-token",
  ];
  const values = [
    process.env.ACCESS_TOKEN_PRIVATE_KEY,
    process.env.REFRESH_TOKEN_PRIVATE_KEY,
    process.env.REFRESH_TOKEN_HASH_SECRET,
    process.env.DEFAULT_PASS,
    process.env.RIAS_ACCESS_TOKEN,
  ];
  const hasPlaceholder = values.some(
    (value) => !value || placeholders.includes(value),
  );
  if (hasPlaceholder) {
    throw new Error("Production secrets are not configured");
  }
};

const app = express();
app.set("trust proxy", trustProxy);
app.use("/Images", express.static("./Images"));

app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }
      if (ALLOWED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS origin is not allowed"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-Token"],
  }),
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});
app.get("/ready", async (req, res) => {
  try {
    await sequelize.authenticate();
    return res.status(200).json({ status: "ready" });
  } catch (error) {
    return res.status(503).json({ status: "not_ready" });
  }
});
app.use("/api/v1/", router);
app.use(errorMiddleware);

let server;
let housesSyncTimer = null;

const scheduleHousesSync = () => {
  const syncIntervalMs = 1000 * 60 * 30;
  HousesService.createHousesByDb().catch((error) => {
    logger.warn("Initial houses sync failed", { error: error.message });
  });
  housesSyncTimer = setInterval(() => {
    HousesService.createHousesByDb().catch((error) => {
      logger.warn("Scheduled houses sync failed", { error: error.message });
    });
  }, syncIntervalMs);
};

const gracefulShutdown = async (signal) => {
  logger.info("Shutdown signal received", { signal });
  if (housesSyncTimer) {
    clearInterval(housesSyncTimer);
  }
  if (server) {
    await new Promise((resolve) => server.close(resolve));
  }
  await sequelize.close();
  process.exit(0);
};

const start = async () => {
  try {
    ensureSecureConfig();
    await sequelize.authenticate();
    await runMigrations();
    await userService.createDefaultUser();
    await organisationInfoService.createOrganisationInfo();
    server = app.listen(PORT, () => {
      logger.info("Server started", { port: PORT });
      scheduleHousesSync();
    });
    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        logger.error("Port is already in use", { port: PORT });
        process.exit(1);
      }
      logger.error("Server startup failed", { error: error.message });
      process.exit(1);
    });
  } catch (e) {
    logger.error("Application bootstrap failed", { error: e.message });
    process.exit(1);
  }
};

process.on("SIGINT", () => {
  gracefulShutdown("SIGINT");
});
process.on("SIGTERM", () => {
  gracefulShutdown("SIGTERM");
});

start();
