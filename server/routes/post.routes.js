const { Router } = require("express");
const router = new Router();
const postsController = require("../controllers/posts.controller");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const authMiddleware = require("../middleware/auth.middleware");

router.get("/", postsController.getAllPosts);
router.get("/:id", postsController.getPostById);
router.post(
  "/",
  authMiddleware,
  upload.single("photo"),
  postsController.createPost,
);
router.put("/:id", authMiddleware, postsController.updatePost);
router.delete("/:id", authMiddleware, postsController.deletePost);
router.post(
  "/:id/photo",
  authMiddleware,
  upload.single("photo"),
  postsController.uploadPhoto,
);

module.exports = router;
