const {User} = require('../models/models');
const bcrypt = require('bcrypt');
const tokenService = require('./token.service');
const UserDto = require('../dto/user.dto');
const ApiError = require('../error/ApiError');

class UserService {

    async login(email, password) {
        const user = await User.findOne({email})
        if (!user) {
            throw ApiError.badRequest('Пользователь с таким email не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.badRequest('Неверный пароль');
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
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
        const user = await User.findByPk(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async getAllUsers() {
        return await User.findAll();
    }

    async createDefaultUser() {
        const email = '52partner@rambler.ru';
        const password = 'partner-service';

        const existingUser = await User.findOne({email});

        if (!existingUser) {
            await User.create({ email, password });
        }

    }
}

module.exports = new UserService();