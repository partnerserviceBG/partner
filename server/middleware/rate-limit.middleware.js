const rateLimit = require("express-rate-limit");

const authLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  skipSuccessfulRequests: true,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Слишком много запросов. Попробуйте позже." },
});

const authRefreshLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Слишком много запросов. Попробуйте позже." },
});

const publicReadLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Слишком много запросов. Попробуйте позже." },
});

module.exports = {
  authLoginLimiter,
  authRefreshLimiter,
  publicReadLimiter,
};
