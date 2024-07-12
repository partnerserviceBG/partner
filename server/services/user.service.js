const { User } = require("../models/models");
const bcrypt = require("bcrypt");
const tokenService = require("./token.service");
const UserDto = require("../dto/user.dto");
const ApiError = require("../error/api-error");
const { verify } = require("jsonwebtoken");

class UserService {
  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw ApiError.badRequest("Пользователь с таким email не найден");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.badRequest("Неверный пароль");
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    return await tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.unauthorized();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.unauthorized();
    }
    if (!tokenService.validateRefreshToken(refreshToken)) {
      return ApiError.forbidden();
    }

    const user = await User.findByPk(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async getAllUsers() {
    return await User.findAll();
  }

  async createDefaultUser() {
    const email = process.env.DEFAULT_ADMIN;
    const password = process.env.DEFAULT_PASS;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      await User.create({ email, password });
    }
  }
}

module.exports = new UserService();
