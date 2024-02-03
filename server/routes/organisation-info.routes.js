const { Router } = require("express");
const router = new Router();
const organisationInfoController = require("../controllers/organisation-info.controller");

router.get("/", organisationInfoController.getAll);
router.get("/info", organisationInfoController.getInfo);
router.get("/schedule", organisationInfoController.getSchedule);
router.get("/license", organisationInfoController.getLicense);

module.exports = router;
