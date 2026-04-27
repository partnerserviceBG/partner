const ApiError = require("../error/api-error");

const isValidEmail = (email) => {
  if (typeof email !== "string") {
    return false;
  }
  const trimmedEmail = email.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);
};

const isValidPassword = (password) => {
  return typeof password === "string" && password.length >= 6;
};

const validateLoginBody = (req, res, next) => {
  const { email, password } = req.body || {};
  if (!isValidEmail(email)) {
    return next(ApiError.badRequest("Некорректный email"));
  }
  if (!isValidPassword(password)) {
    return next(
      ApiError.badRequest("Пароль должен содержать минимум 6 символов"),
    );
  }
  return next();
};

module.exports = {
  validateLoginBody,
};
