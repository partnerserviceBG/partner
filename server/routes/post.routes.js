const { Router } = require("express");
const router = new Router();
const { extname } = require("path");
const postsController = require("../controllers/posts.controller");
const authMiddleware = require("../middleware/auth.middleware");
const multer = require("multer");
const { publicReadLimiter } = require("../middleware/rate-limit.middleware");
const { requireRole } = require("../middleware/require-role.middleware");
const {
  validatePostsQuery,
  validateIdParam,
} = require("../middleware/query-validation.middleware");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1_000_000 },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = new Set(["image/jpeg", "image/png"]);
    const allowedExtensions = new Set([".jpg", ".jpeg", ".png"]);
    const extension = extname(file.originalname).toLowerCase();
    const isValidMimeType = allowedMimeTypes.has(file.mimetype);
    const isValidExtension = allowedExtensions.has(extension);

    if (isValidMimeType && isValidExtension) {
      return cb(null, true);
    }
    return cb(new Error("Unsupported file type"));
  },
});

router.get("/", publicReadLimiter, validatePostsQuery, postsController.getAllPosts);
router.get("/:id", publicReadLimiter, validateIdParam, postsController.getPostById);
router.post(
  "/",
  authMiddleware,
  requireRole("admin"),
  upload.single("image"),
  postsController.createPost,
);
router.put(
  "/:id",
  authMiddleware,
  requireRole("admin"),
  upload.single("image"),
  postsController.updatePost,
);
router.delete("/:id", authMiddleware, requireRole("admin"), postsController.deletePost);
module.exports = router;
