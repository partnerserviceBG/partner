const { Post, PostHouse, User } = require("../models/models");
const ApiError = require("../error/api-error");
const { Op } = require("sequelize");
const sequelize = require("../db");

const normalizeImagePath = (imagePath) => {
  if (!imagePath) {
    return "Images/default_news_img.jpg";
  }
  return imagePath.replace(/\\/g, "/");
};

const normalizeHousesIds = (housesId) => {
  if (Array.isArray(housesId)) {
    return housesId.map((id) => String(id).trim()).filter(Boolean);
  }
  if (typeof housesId === "string") {
    return housesId
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);
  }
  return [];
};

const normalizePaging = (value, fallback) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }
  return Math.floor(parsed);
};

const mapPostToResponse = (post) => {
  const raw = post.toJSON ? post.toJSON() : post;
  const housesId = Array.isArray(raw.postHouses)
    ? raw.postHouses.map((item) => String(item.houseId))
    : [];
  return {
    ...raw,
    housesId,
    postHouses: undefined,
  };
};

const replacePostHouses = async (postId, housesIds, transaction) => {
  await PostHouse.destroy({
    where: { postId },
    transaction,
  });
  if (housesIds.length === 0) {
    return;
  }
  await PostHouse.bulkCreate(
    housesIds.map((houseId) => ({
      postId,
      houseId,
    })),
    { transaction },
  );
};

class PostsController {
  async createPost(req, res, next) {
    const { title, content, housesId } = req.body;
    const image = normalizeImagePath(req.file?.path);
    const normalizedHousesIds = normalizeHousesIds(housesId);
    try {
      const user = await User.findByPk(req.user.id);
      if (!user) {
        return next(ApiError.unauthorized());
      }
      const post = await sequelize.transaction(async (transaction) => {
        const createdPost = await Post.create({
          title,
          content,
          image,
          userId: user.id,
        }, { transaction });
        await replacePostHouses(createdPost.id, normalizedHousesIds, transaction);
        return Post.findByPk(createdPost.id, {
          include: [{ model: PostHouse, as: "postHouses", attributes: ["houseId"] }],
          transaction,
        });
      });
      res.status(201).json(mapPostToResponse(post));
    } catch (error) {
      next(ApiError.internal("Ошибка создания поста"));
    }
  }

  async getAllPosts(req, res, next) {
    const { houseId, page, limit, search } = req.query;
    try {
      const pageNum = normalizePaging(page, 1);
      const limitNum = normalizePaging(limit, 50);
      const normalizedSearch = typeof search === "string"
        ? search.trim().toLowerCase()
        : "";
      const offset = (pageNum - 1) * limitNum;
      const where = {};
      const include = [];
      if (houseId) {
        include.push({
          model: PostHouse,
          as: "postHouses",
          attributes: ["houseId"],
          where: { houseId: String(houseId) },
          required: true,
        });
      } else {
        include.push({
          model: PostHouse,
          as: "postHouses",
          attributes: ["houseId"],
          required: false,
        });
      }

      if (normalizedSearch) {
        const searchCondition = {
          [Op.or]: [
            sequelize.where(
              sequelize.fn("LOWER", sequelize.col("title")),
              { [Op.like]: `%${normalizedSearch}%` },
            ),
            sequelize.where(
              sequelize.fn("LOWER", sequelize.col("content")),
              { [Op.like]: `%${normalizedSearch}%` },
            ),
          ],
        };
        where[Op.and] = where[Op.and]
          ? [...where[Op.and], searchCondition]
          : [searchCondition];
      }

      const { rows: items, count: total } = await Post.findAndCountAll({
        where,
        include,
        distinct: true,
        limit: limitNum,
        offset,
        order: [["createdAt", "DESC"]],
      });

      res.set("X-Total-Count", String(total));
      res.set("X-Page", String(pageNum));
      res.set("X-Limit", String(limitNum));
      return res.json(items.map((post) => mapPostToResponse(post)));
    } catch (error) {
      next(ApiError.internal("Ошибка получения постов"));
    }
  }

  async updatePost(req, res, next) {
    const { id } = req.params;
    const { title, content, housesId } = req.body;
    const image = req.file?.path ? normalizeImagePath(req.file.path) : null;
    const normalizedHousesIds = normalizeHousesIds(housesId);
    try {
      const post = await Post.findByPk(id, {
        include: [{ model: PostHouse, as: "postHouses", attributes: ["houseId"] }],
      });
      if (post) {
        const updatedPost = await sequelize.transaction(async (transaction) => {
          post.title = title;
          post.content = content;
          if (image) {
            post.image = image;
          }
          await post.save({ transaction });
          await replacePostHouses(post.id, normalizedHousesIds, transaction);
          return Post.findByPk(id, {
            include: [{ model: PostHouse, as: "postHouses", attributes: ["houseId"] }],
            transaction,
          });
        });
        res.json(mapPostToResponse(updatedPost));
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
      const post = await Post.findByPk(id, {
        include: [{ model: PostHouse, as: "postHouses", attributes: ["houseId"] }],
      });
      if (post) {
        res.json(mapPostToResponse(post));
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

const postsController = new PostsController();

module.exports = postsController;
module.exports.__test__ = {
  normalizeHousesIds,
  mapPostToResponse,
};
