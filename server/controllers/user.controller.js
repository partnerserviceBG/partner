const ApiError = require("../error/api-error");
const userService = require("../services/user.service");
const {
  attachCsrfCookie,
  clearCsrfCookie,
  createCsrfToken,
} = require("../middleware/csrf.middleware");

const REFRESH_TOKEN_COOKIE = "refreshToken";
const AUTH_COOKIE_PATH = "/api/v1/users";
const getRefreshCookieOptions = (req) => {
  const isHttpsRequest =
    req.secure || req.headers["x-forwarded-proto"] === "https";
  return {
    httpOnly: true,
    secure: isHttpsRequest,
    sameSite: isHttpsRequest ? "none" : "lax",
    maxAge: 1000 * 60 * 60,
    path: AUTH_COOKIE_PATH,
  };
};

class UserController {
  async login(req, res, next) {
    const { email, password } = req.body;

    try {
      const userData = await userService.login(email, password);
      const csrfToken = createCsrfToken();
      res.cookie(
        REFRESH_TOKEN_COOKIE,
        userData.refreshToken,
        getRefreshCookieOptions(req),
      );
      attachCsrfCookie(req, res, csrfToken);
      return res.json({
        accessToken: userData.accessToken,
        user: userData.user,
        csrfToken,
      });
    } catch (e) {
      next(ApiError.forbidden("Неверный email или пароль"));
    }
  }

  async logout(req, res, next) {
    try {
      const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE];
      const token = await userService.logout(refreshToken);
      res.clearCookie(REFRESH_TOKEN_COOKIE, getRefreshCookieOptions(req));
      clearCsrfCookie(req, res);
      return res.json(token);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async refresh(req, res, next) {
    try {
      const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE];
      const userData = await userService.refresh(refreshToken);
      const csrfToken = createCsrfToken();
      res.cookie(
        REFRESH_TOKEN_COOKIE,
        userData.refreshToken,
        getRefreshCookieOptions(req),
      );
      attachCsrfCookie(req, res, csrfToken);
      return res.json({
        accessToken: userData.accessToken,
        user: userData.user,
        csrfToken,
      });
    } catch (e) {
      next(ApiError.unauthorized(e.message));
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
