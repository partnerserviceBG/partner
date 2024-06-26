const { Post, User } = require("../models/models");
const ApiError = require("../error/api-error");

class PostsController {
  async createPost(req, res, next) {
    const { title, content, housesId } = req.body;
    const image = req.file?.path || `Images/default_news_img.jpg`;
    try {
      const user = await User.findByPk(req.user.id);
      const post = await Post.create({
        title,
        content,
        image,
        housesId,
        userId: user.id,
      });
      res.status(201).json(post);
    } catch (error) {
      next(ApiError.internal("Ошибка создания поста"));
    }
  }

  async getAllPosts(req, res, next) {
    try {
      const posts = await Post.findAll();
      res.json(posts);
    } catch (error) {
      next(ApiError.internal("Ошибка получения постов"));
    }
  }

  async updatePost(req, res, next) {
    const { id } = req.params;
    const { title, content, housesId } = req.body;
    const image = req.file?.path || null;
    try {
      const post = await Post.findByPk(id);
      if (post) {
        post.title = title;
        post.content = content;
        post.housesId = housesId;
        if (image) {
          post.image = image;
        }
        await post.save();
        res.json(post);
      } else {
        next(ApiError.badRequest("Пост отсутствует"));
      }
    } catch (error) {
      next(ApiError.internal("Ошибка обновления поста"));
    }
  }

  async getPostById(req, res, next) {
    const { id } = req.params;
    try {
      const post = await Post.findByPk(id);
      if (post) {
        res.json(post);
      } else {
        next(ApiError.badRequest("Пост отсутствует"));
      }
    } catch (error) {
      next(ApiError.internal("Ошибка получения поста"));
    }
  }

  async deletePost(req, res, next) {
    const { id } = req.params;
    try {
      const post = await Post.findByPk(id);
      if (post) {
        await post.destroy();
        res.json({ message: "Post deleted successfully" });
      } else {
        next(ApiError.badRequest("Пост отсутствует"));
      }
    } catch (error) {
      next(ApiError.internal("Ошибка удаления поста"));
    }
  }
}

module.exports = new PostsController();
