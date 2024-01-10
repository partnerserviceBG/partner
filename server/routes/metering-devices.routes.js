const { Router } = require("express");
const router = new Router();
const meteringDevicesController = require("../controllers/metering-devices.controller");

router.get("/", meteringDevicesController.getAll);
router.get("/:id", meteringDevicesController.getOne);

module.exports = router;
