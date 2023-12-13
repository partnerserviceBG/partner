const jwt = require('jsonwebtoken');
const {Token} = require('../models/models');

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30d'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        } catch (e) {
            return null;
        }
    }

    async saveToken(byUser, refreshToken) {
        const tokenData = await Token.findOne({byUser})
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        return await Token.create({byUser, refreshToken});
    }

    async removeToken(refreshToken) {
        return await Token.destroy(refreshToken);
    }

    async findToken(refreshToken) {
        return await Token.findOne(refreshToken);
    }
}

module.exports = new TokenService();