const { Router } = require("express");
const router = new Router();
const organisationInfoController = require("../controllers/organisation-info.controller");

router.get("/", organisationInfoController.getAllInfo);

module.exports = router;
