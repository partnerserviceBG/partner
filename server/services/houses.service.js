const axios = require("axios");
const { Houses } = require("../models/models");

class HousesService {
  async createHousesByDb() {
    const data = await axios.get("https://api.rias-gkh.ru/v2.0/houses", {
      params: {
        "access-token": "a4a6a69cd5e5506fa64d",
        expand: "entrances, rooms",
      },
    });
    const housesByDb = Houses.findAll();
    if (!housesByDb) {
      Houses.create(data);
    }
  }
}

module.exports = new HousesService();
