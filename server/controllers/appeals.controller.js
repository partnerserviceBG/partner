require("dotenv").config();
const axios = require("axios");
const ApiError = require("../error/api-error");

class AppealsController {
  async getAll(req, res, next) {
    const accessToken = process.env.RIAS_ACCESS_TOKEN;
    await axios
      .get("https://api.rias-gkh.ru/v2.0/appeals", {
        params: {
          "limit": '1000',
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

  async getOne(req, res, next) {
    const accessToken = process.env.RIAS_ACCESS_TOKEN;
    await axios
      .get(
        `https://api.rias-gkh.ru/v2.0/appeals/${req.params.id}`,
        {
          params: {
            "access-token": accessToken,
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

module.exports = new AppealsController();
