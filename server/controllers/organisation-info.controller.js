const { License, Schedule, Info } = require("../models/models");

class OrganisationInfoController {
  async getAll(req, res, next) {
    const license = await License.findAll();
    const info = await Info.findAll();
    const operatingMode = await Schedule.findAll();
    try {
      return res.json({ license, info, operatingMode });
    } catch (error) {
      next(error);
    }
  }
  async getInfo(req, res, next) {
    const info = await Info.findAll();
    try {
      return res.json(info);
    } catch (error) {
      next(error);
    }
  }
  async getSchedule(req, res, next) {
    const schedule = await Schedule.findAll();
    try {
      return res.json(schedule);
    } catch (error) {
      next(error);
    }
  }

  async getLicense(req, res, next) {
    const license = await License.findAll();
    try {
      return res.json(license);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OrganisationInfoController();
