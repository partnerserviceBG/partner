require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const cors = require("cors");
const router = require("./routes/index");
const userService = require("./services/user.service");
const HousesService = require("./services/houses.service");
const organisationInfoService = require("./services/organisation-info.service");

const PORT = process.env.PORT || 5000;

const app = express();
app.use("/Images", express.static("./Images"));

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1/", router);
const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync().then(() => {
      userService.createDefaultUser();
      organisationInfoService.createOrganisationInfo();
      HousesService.createHousesByDb();
    });
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
