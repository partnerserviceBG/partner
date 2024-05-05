const { Router } = require("express");
const router = new Router();
const nsiController = require("../controllers/nsi.controller");

router.get("/", nsiController.getAll);
router.get("/:id", nsiController.getOne);

module.exports = router;