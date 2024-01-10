const {
  OperatingMode,
  OrganisationInfo,
  License,
} = require("../models/models");

class OrganisationInfoController {
  async getAllInfo(req, res, next) {
    const license = await License.findAll();
    const info = await OrganisationInfo.findAll();
    const operatingMode = await OperatingMode.findAll();
    try {
      return res.json({ license, info, operatingMode });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OrganisationInfoController();
