require("dotenv").config();
const axios = require("axios");
const ApiError = require("../error/api-error");
const { Houses } = require("../models/models");
class HousesController {
  async getAll(req, res, next) {
    const data = await axios
      .get("https://api.rias-gkh.ru/v2.0/houses", {
        params: {
          "access-token": "a4a6a69cd5e5506fa64d",
          expand: "entrances, rooms",
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
        next(ApiError.internal("Ошибка сервера"));
      });

    if (data) {
      res.json(data);
    } else {
      const houses = Houses.findAll();
      res.json(houses);
    }
  }

  async getOne(req, res, next) {
    await axios
      .get(`https://api.rias-gkh.ru/v2.0/houses/${req.params.id}`, {
        params: {
          "access-token": "a4a6a69cd5e5506fa64d",
          expand: "entrances",
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
}

module.exports = new HousesController();
