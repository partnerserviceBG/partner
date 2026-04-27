require("dotenv").config();
const ApiError = require("../error/api-error");
const housesService = require("../services/houses.service");
const logger = require("../utils/logger");

class HousesController {
  async getAll(req, res, next) {
    const { page, limit, search } = req.query;
    let housesFromDbBackup = null;

    try {
      const housesFromDb = await housesService.getHousesFromDb({
        page,
        limit,
        search,
      });
      housesFromDbBackup = housesFromDb;
      if (housesFromDb.items.length > 0) {
        res.set("X-Houses-Source", "db");
        res.set("X-Total-Count", String(housesFromDb.total));
        res.set("X-Page", String(housesFromDb.page));
        res.set("X-Limit", String(housesFromDb.limit));
        return res.json(housesFromDb.items);
      }
    } catch (error) {
      return next(ApiError.internal("Ошибка чтения домов из БД"));
    }

    try {
      const housesFromRias = await housesService.syncHousesFromRias();
      if (housesFromRias) {
        const housesFromDb = await housesService.getHousesFromDb({
          page,
          limit,
          search,
        });
        res.set("X-Houses-Source", "rias");
        res.set("X-Total-Count", String(housesFromDb.total));
        res.set("X-Page", String(housesFromDb.page));
        res.set("X-Limit", String(housesFromDb.limit));
        return res.json(housesFromDb.items);
      }
    } catch (error) {
      logger.warn("Failed to fetch houses from RIAS", { error: error.message });
    }

    if (housesFromDbBackup && housesFromDbBackup.items.length > 0) {
      res.set("X-Houses-Source", "db");
      res.set("X-Total-Count", String(housesFromDbBackup.total));
      res.set("X-Page", String(housesFromDbBackup.page));
      res.set("X-Limit", String(housesFromDbBackup.limit));
      return res.json(housesFromDbBackup.items);
    }

    return next(ApiError.internal("Дома не найдены"));
  }

  async getOne(req, res, next) {
    try {
      const houseFromRias = await housesService.getHouseFromRiasById(
        req.params.id,
      );
      if (houseFromRias) {
        await housesService.saveHousesToDb([houseFromRias]);
        res.set("X-House-Source", "rias");
        return res.json([houseFromRias]);
      }
    } catch (error) {
      logger.warn("Failed to fetch house from RIAS", {
        houseId: req.params.id,
        error: error.message,
      });
    }

    try {
      const house = await housesService.getHouseFromDbById(req.params.id);
      if (house) {
        res.set("X-House-Source", "db");
        return res.json([house]);
      }
      return next(ApiError.badRequest("Дом отсутствует"));
    } catch (error) {
      return next(ApiError.internal("Ошибка получения дома"));
    }
  }

  async sync(req, res, next) {
    const overwrite = req.body?.overwrite === true;
    try {
      const housesFromRias = await housesService.syncHousesFromRias({ overwrite });
      const synced = Array.isArray(housesFromRias) ? housesFromRias.length : 0;
      return res.json({
        synced,
        overwrite,
      });
    } catch (error) {
      logger.warn("Failed to sync houses from RIAS", { error: error.message });
      return next(ApiError.internal("Ошибка синхронизации домов"));
    }
  }
}

module.exports = new HousesController();
