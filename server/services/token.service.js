const jwt = require("jsonwebtoken");
const { Token } = require("../models/models");
const crypto = require("crypto");
const { Op } = require("sequelize");

const hashRefreshToken = (token) => {
  const hashSecret =
    process.env.REFRESH_TOKEN_HASH_SECRET ||
    process.env.REFRESH_TOKEN_PRIVATE_KEY;
  return crypto
    .createHmac("sha256", hashSecret)
    .update(token)
    .digest("hex");
};

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
      {
        expiresIn: "15m",
      },
    );
    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_PRIVATE_KEY,
      {
        expiresIn: "1h",
      },
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token) {
    try {
      return jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY);
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.REFRESH_TOKEN_PRIVATE_KEY);
    } catch (e) {
      return null;
    }
  }

  async saveToken(byUser, refreshToken) {
    const refreshTokenHash = hashRefreshToken(refreshToken);
    const tokenData = await Token.findOne({ where: { byUser } });
    if (tokenData) {
      tokenData.refreshToken = refreshTokenHash;
      return tokenData.save();
    }
    return await Token.create({ byUser, refreshToken: refreshTokenHash });
  }

  async removeToken(refreshToken) {
    const refreshTokenHash = hashRefreshToken(refreshToken);
    return await Token.destroy({
      where: { refreshToken: { [Op.in]: [refreshTokenHash, refreshToken] } },
    });
  }

  async findToken(refreshToken) {
    const refreshTokenHash = hashRefreshToken(refreshToken);
    return await Token.findOne({
      where: { refreshToken: { [Op.in]: [refreshTokenHash, refreshToken] } },
    });
  }
}

module.exports = new TokenService();
