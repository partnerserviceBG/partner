const { Router } = require("express");
const router = new Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");
const {
  authLoginLimiter,
  authRefreshLimiter,
} = require("../middleware/rate-limit.middleware");
const { validateLoginBody } = require("../middleware/auth-validation.middleware");
const { validateCsrf } = require("../middleware/csrf.middleware");
const { requireRole } = require("../middleware/require-role.middleware");

router.post("/login", authLoginLimiter, validateLoginBody, userController.login);
router.post("/logout", validateCsrf, userController.logout);
router.post("/refresh", authRefreshLimiter, validateCsrf, userController.refresh);
router.get("/", authMiddleware, requireRole("admin"), userController.getUsers);

module.exports = router;
