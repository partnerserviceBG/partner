require("dotenv").config();
const axios = require("axios");
const ApiError = require("../error/api-error");

class DebtRequestController {
  async getAll(req, res, next) {
    await axios
      .get("https://api.rias-gkh.ru/v2.0/debt-requests", {
        params: {
          "limit": '1000',
          "access-token": "a4a6a69cd5e5506fa64d",
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

  async getOne(req, res, next) {
    await axios
      .get(
        `https://api.rias-gkh.ru/v2.0/debt-requests/${req.params.id}`,
        {
          params: {
            "access-token": "a4a6a69cd5e5506fa64d",
          },
        },
      )
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        console.error(error);
        next(ApiError.internal("Ошибка сервера"));
      });
  }
}

module.exports = new DebtRequestController();