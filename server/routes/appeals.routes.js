const { Router } = require("express");
const router = new Router();
const appealsController = require("../controllers/appeals.controller");

router.get("/", appealsController.getAll);
router.get("/:id", appealsController.getOne);

module.exports = router;
