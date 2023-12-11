const {Router} = require("express");
const router = new Router()
const postController = require('../controllers/post.controller')


router.post('/', postController.create)
router.get('/', postController.getAll)
router.get('/:id', postController.getOne)
router.put('/:id', postController.updatePost)
router.delete('/:id', postController.deletePost)

module.exports = router