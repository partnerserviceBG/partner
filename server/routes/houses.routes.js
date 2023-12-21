const {Router} = require("express");
const router = new Router()
const housesController = require('../controllers/houses.controller')

router.get('/', housesController.getAll)
router.get('/:id', housesController.getOne)

module.exports = router