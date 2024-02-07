const { Router } = require("express");
const router = new Router();
const ManagementContractsController = require("../controllers/management-contracts.controller");

router.get("/", ManagementContractsController.getAll);
router.get("/:id", ManagementContractsController.getOne);

module.exports = router;
