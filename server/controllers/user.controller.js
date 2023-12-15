const ApiError = require("../error/api-error");
const userService = require("../services/user.service");
class UserController {
  async login(req, res, next) {
    const { email, password } = req.body;

    try {
      const userData = await userService.login(email, password);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const token = await userService.logout(refreshToken);
      return res.json(token);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const userData = await userService.refresh(refreshToken);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (e) {
      next(ApiError.internal("Ошибка сервера"));
    }
  }
}

module.exports = new UserController();
