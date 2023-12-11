const express = require('express');

const router = express.Router({ mergeParams: true });

const postRouter = require('./post.routes');
const housesRouter = require('./houses.routes');

router.use('/posts', postRouter);
router.use('/houses', housesRouter);


module.exports = router;