const express = require('express');

const router = express.Router({ mergeParams: true });

const postRouter = require('./post.routes');
const housesRouter = require('./houses.routes');
const userRouter = require('./user.routes');

router.use('/posts', postRouter);
router.use('/houses', housesRouter);
router.use('/users', userRouter)

module.exports = router;