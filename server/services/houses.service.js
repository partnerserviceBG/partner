const axios = require("axios");
const { Houses } = require("../models/models");
const logger = require("../utils/logger");
const { Op } = require("sequelize");
const sequelize = require("../db");

const RIAS_BASE_URL = "https://api.rias-gkh.ru/v2.0/houses";

class HousesService {
  normalizePaging(value, fallback) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      return fallback;
    }
    return Math.floor(parsed);
  }

  async requestWithRetry(config, retries = 2) {
    let attempt = 0;
    while (attempt <= retries) {
      try {
        return await axios(config);
      } catch (error) {
        if (attempt === retries) {
          throw error;
        }
        attempt += 1;
      }
    }
    return null;
  }

  isValidHouse(house) {
    return !!(house && house.id !== undefined && house.full_address);
  }

  normalizeHouse(house) {
    return {
      ...house,
      geometry: Array.isArray(house.geometry) ? house.geometry : [],
      entrances: Array.isArray(house.entrances) ? house.entrances : [],
      premises: Array.isArray(house.premises) ? house.premises : [],
      devices: Array.isArray(house.devices) ? house.devices : [],
      managementContracts: Array.isArray(house.managementContracts)
        ? house.managementContracts
        : [],
      resourceSupplyContracts: Array.isArray(house.resourceSupplyContracts)
        ? house.resourceSupplyContracts
        : [],
    };
  }

  normalizeHouses(houses) {
    if (!Array.isArray(houses)) {
      return [];
    }
    return houses
      .filter((house) => this.isValidHouse(house))
      .map((house) => this.normalizeHouse(house));
  }

  async getHousesFromRias() {
    const accessToken = process.env.RIAS_ACCESS_TOKEN;
    if (!accessToken) {
      throw new Error("RIAS_ACCESS_TOKEN is not set");
    }

    const response = await this.requestWithRetry({
      method: "get",
      url: RIAS_BASE_URL,
      params: {
        limit: "1000",
        "access-token": accessToken,
        expand: "entrances, premises, devices",
      },
    });

    return this.normalizeHouses(response.data);
  }

  async getHouseFromRiasById(id) {
    const accessToken = process.env.RIAS_ACCESS_TOKEN;
    if (!accessToken) {
      throw new Error("RIAS_ACCESS_TOKEN is not set");
    }
    const response = await this.requestWithRetry({
      method: "get",
      url: `${RIAS_BASE_URL}/${id}`,
      params: {
        "access-token": accessToken,
        expand:
          "devices, entrances, premises,rooms, resourceSupplyContracts, managementContracts, objectState, houseOwnershipAnnulmentReason, entrances.premises, entrances.premises.premiseCharacterstic",
      },
    });
    const rawHouse = Array.isArray(response.data)
      ? response.data[0]
      : response.data;
    if (!rawHouse) {
      return null;
    }
    const [house] = this.normalizeHouses([rawHouse]);
    return house || null;
  }

  async saveHousesToDb(houses, options = {}) {
    const overwrite = options.overwrite === true;
    if (!Array.isArray(houses) || houses.length === 0) {
      return;
    }

    const rows = this.normalizeHouses(houses)
      .map((house) => ({
        riasId: String(house.id),
        payload: house,
        fullAddress: typeof house.full_address === "string"
          ? house.full_address
          : null,
        geometry: Array.isArray(house.geometry) ? house.geometry : null,
      }));

    if (rows.length === 0) {
      return;
    }

    if (overwrite) {
      await Houses.bulkCreate(rows, {
        updateOnDuplicate: ["payload", "fullAddress", "geometry", "updatedAt"],
      });
      return;
    }

    await Houses.bulkCreate(rows, {
      ignoreDuplicates: true,
    });
  }

  async getHousesFromDb(options = {}) {
    const page = this.normalizePaging(options.page, 1);
    const limit = this.normalizePaging(options.limit, 1000);
    const search = typeof options.search === "string"
      ? options.search.trim().toLowerCase()
      : "";
    const offset = (page - 1) * limit;

    const where = search
      ? sequelize.where(
          sequelize.fn("LOWER", sequelize.col("fullAddress")),
          { [Op.like]: `%${search}%` },
        )
      : {};
    const { rows, count } = await Houses.findAndCountAll({
      where,
      limit,
      offset,
      order: [["updatedAt", "DESC"]],
    });
    const houses = this.normalizeHouses(rows.map((row) => ({
      ...row.payload,
      geometry: row.geometry || row.payload?.geometry,
    })));

    return {
      items: houses,
      total: count,
      page,
      limit,
    };
  }

  async getHouseFromDbById(id) {
    const row = await Houses.findOne({ where: { riasId: String(id) } });
    if (!row) {
      return null;
    }
    const [house] = this.normalizeHouses([{
      ...row.payload,
      geometry: row.geometry || row.payload?.geometry,
    }]);
    return house || null;
  }

  async syncHousesFromRias(options = {}) {
    const houses = await this.getHousesFromRias();
    if (!Array.isArray(houses) || houses.length === 0) {
      return null;
    }

    await this.saveHousesToDb(houses, options);
    return houses;
  }

  async createHousesByDb() {
    try {
      await this.syncHousesFromRias();
    } catch (error) {
      logger.warn("Initial houses sync failed", { error: error.message });
    }
  }
}

module.exports = new HousesService();
