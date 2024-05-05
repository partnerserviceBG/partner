const { Router } = require("express");
const router = new Router();
const debtRequestController = require("../controllers/debt-request.controller");

router.get("/", debtRequestController.getAll);
router.get("/:id", debtRequestController.getOne);

module.exports = router;