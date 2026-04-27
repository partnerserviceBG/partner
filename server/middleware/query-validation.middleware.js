const ApiError = require("../error/api-error");

const MAX_PAGINATION_LIMIT = 1000;

const parsePositiveInt = (value) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return null;
  }
  return Math.floor(parsed);
};

const validatePagingAndSearchQuery = (req, res, next) => {
  const { page, limit, search } = req.query || {};

  if (page !== undefined && parsePositiveInt(page) === null) {
    return next(ApiError.badRequest("Параметр page должен быть положительным числом"));
  }

  const parsedLimit = limit === undefined ? null : parsePositiveInt(limit);
  if (limit !== undefined && parsedLimit === null) {
    return next(ApiError.badRequest("Параметр limit должен быть положительным числом"));
  }
  if (parsedLimit !== null && parsedLimit > MAX_PAGINATION_LIMIT) {
    return next(ApiError.badRequest(`Параметр limit не должен превышать ${MAX_PAGINATION_LIMIT}`));
  }

  if (search !== undefined && typeof search !== "string") {
    return next(ApiError.badRequest("Параметр search должен быть строкой"));
  }
  return next();
};

const validatePostsQuery = (req, res, next) => {
  const { houseId } = req.query || {};

  if (houseId !== undefined) {
    const normalized = String(houseId).trim();
    if (!normalized) {
      return next(ApiError.badRequest("Параметр houseId не должен быть пустым"));
    }
  }

  return validatePagingAndSearchQuery(req, res, next);
};

const validateIdParam = (req, res, next) => {
  const normalized = String(req.params?.id || "").trim();
  if (!normalized) {
    return next(ApiError.badRequest("Некорректный id"));
  }
  return next();
};

module.exports = {
  validatePagingAndSearchQuery,
  validatePostsQuery,
  validateIdParam,
};
