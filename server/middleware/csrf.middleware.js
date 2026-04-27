const crypto = require("crypto");
const ApiError = require("../error/api-error");

const CSRF_COOKIE = "csrfToken";
const AUTH_COOKIE_PATH = "/api/v1/users";

const getIsHttpsRequest = (req) => {
  return req.secure || req.headers["x-forwarded-proto"] === "https";
};

const getCsrfCookieOptions = (req) => {
  const isHttpsRequest = getIsHttpsRequest(req);
  return {
    httpOnly: false,
    secure: isHttpsRequest,
    sameSite: isHttpsRequest ? "none" : "lax",
    maxAge: 1000 * 60 * 60,
    path: AUTH_COOKIE_PATH,
  };
};

const createCsrfToken = () => crypto.randomBytes(32).toString("hex");

const attachCsrfCookie = (req, res, token) => {
  res.cookie(CSRF_COOKIE, token, getCsrfCookieOptions(req));
};

const clearCsrfCookie = (req, res) => {
  res.clearCookie(CSRF_COOKIE, getCsrfCookieOptions(req));
};

const validateCsrf = (req, res, next) => {
  const hasRefreshSession = Boolean(req.cookies?.refreshToken);
  if (!hasRefreshSession) {
    return next();
  }
  const cookieToken = req.cookies?.[CSRF_COOKIE];
  const headerToken = req.headers["x-csrf-token"];
  if (!cookieToken || !headerToken || cookieToken !== headerToken) {
    return next(ApiError.forbidden("CSRF token is invalid"));
  }
  return next();
};

module.exports = {
  CSRF_COOKIE,
  createCsrfToken,
  attachCsrfCookie,
  clearCsrfCookie,
  validateCsrf,
};
