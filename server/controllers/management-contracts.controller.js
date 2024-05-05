require("dotenv").config();
const axios = require("axios");
const ApiError = require("../error/api-error");

class ManagementContractsController {
  async getAll(req, res, next) {
    await axios
      .get("https://api.rias-gkh.ru/v2.0/management-contracts", {
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
        `https://api.rias-gkh.ru/v2.0/management-contracts/${req.params.id}`,
        {
          params: {
            "access-token": "a4a6a69cd5e5506fa64d",
            expand: "protocols,  cooperative, municipalHousing, buildingOwner,  terminationReason, contractBase",
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

module.exports = new ManagementContractsController();
