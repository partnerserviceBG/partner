require("dotenv").config();
const axios = require("axios");
const ApiError = require("../error/api-error");

class MeteringDevicesController {
  async getAll(req, res, next) {
    const accessToken = process.env.RIAS_ACCESS_TOKEN;
    await axios
      .get("https://api.rias-gkh.ru/v2.0/metering-devices", {
        params: {
          expand: "errors, premise, room, houseOwnership, resources, resources.municipalResource, readings, verificationInterval",
          limit: '1000',
          "access-token": accessToken,
        },
      })
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        console.error(error);
        next(ApiError.internal("Ошибка сервера"));
      });
  }

  async getOne(req, res) {
    const accessToken = process.env.RIAS_ACCESS_TOKEN;
    await axios
      .get(`https://api.rias-gkh.ru/v2.0/metering-devices/${req.params.id}`, {
        params: {
          "access-token": accessToken,
          expand: "errors, premise, room, houseOwnership, resources, resources.municipalResource, readings, verificationInterval",
        },
      })
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

module.exports = new MeteringDevicesController();
