require('dotenv').config()
const axios = require('axios');

class HousesController {
    baseUrl = process.env.RIAS_URL;
    accessKey = process.env.ACCESS_KEY;

    async getAll(req, res) {
       await axios.get(this.baseUrl, {params: {'access-token': this.accessKey}}).then(response => {
            res.json(response.data);
        }).catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Ошибка сервера' });
        });
    }

    async getOne(req, res) {
        await axios.get(this.baseUrl, {params: {'access-token': this.accessKey}}).then(response => {
            res.json(response.data);
        }).catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Ошибка сервера' });
        });


    }

}

module.exports = new HousesController();