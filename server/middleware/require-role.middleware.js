const ApiError = require("../error/api-error");

const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(ApiError.unauthorized());
    }
    if (req.user.role !== role) {
      return next(ApiError.forbidden("Недостаточно прав"));
    }
    return next();
  };
};

module.exports = {
  requireRole,
};
