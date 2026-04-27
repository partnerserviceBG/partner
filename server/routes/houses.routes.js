const { Router } = require("express");
const router = new Router();
const housesController = require("../controllers/houses.controller");
const { publicReadLimiter } = require("../middleware/rate-limit.middleware");
const {
  validatePagingAndSearchQuery,
  validateIdParam,
} = require("../middleware/query-validation.middleware");
const authMiddleware = require("../middleware/auth.middleware");
const { requireRole } = require("../middleware/require-role.middleware");

router.get("/", publicReadLimiter, validatePagingAndSearchQuery, housesController.getAll);
router.get("/:id", publicReadLimiter, validateIdParam, housesController.getOne);
router.post("/sync", authMiddleware, requireRole("admin"), housesController.sync);

module.exports = router;
