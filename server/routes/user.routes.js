const { Router } = require("express");
const router = new Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/login", userController.login);
router.post("/logout", authMiddleware, userController.logout);
router.post("/refresh", userController.refresh);
router.get("/", authMiddleware, userController.getUsers);

module.exports = router;
