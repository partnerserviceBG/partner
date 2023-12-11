const {Post} = require('../models/models');

class PostController {
    async create(req, res) {
        const { title, content, photo } = req.body;
        Post.create({ title, content, photo }).then(post => {
            res.json(post);
        })
    }

    async getAll(req, res) {
        Post.findAll().then(posts => {
            res.json(posts);
        })
    }

    async updatePost(req, res) {
        const { title, content, photo } = req.body;
        Post.findByPk(req.params.id).then(post => {
            if (post) {
                post.update({ title, content, photo }).then(updatedPost => {
                    res.json(updatedPost);
                })
            }
        })
    }

    async getOne(req, res) {
        Post.findByPk(req.params.id).then(post => {
            if (post) {
                res.json(post);
            }
        })
    }

    async deletePost(req, res) {
        Post.findByPk(req.params.id).then(post => {
            if (post) {
                post.destroy().then(() => {
                    res.json({ message: 'Пост удален' });
                })
            }
        })
    }

}

module.exports = new PostController()

