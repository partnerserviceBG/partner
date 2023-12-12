require('dotenv').config()
const axios = require('axios');
const ApiError = require("../error/ApiError");

class HousesController {
    async getAll(req, res, next) {
       await axios.get('https://api.rias-gkh.ru/v2.0/houses', {params: {'access-token': 'a4a6a69cd5e5506fa64d'}}).then(response => {
            res.json(response.data);
        }).catch(error => {
            console.error(error);
            next(ApiError.internal('Ошибка сервера'))
        });
    }

    async getOne(req, res, next) {
        await axios.get('https://api.rias-gkh.ru/v2.0/houses', {params: {'access-token': 'a4a6a69cd5e5506fa64d', id: req.params.id}}).then(response => {
            res.json(response.data);
        }).catch(error => {
            console.error(error);
            next(ApiError.internal('Ошибка сервера'))
        });
    }
}

module.exports = new HousesController();