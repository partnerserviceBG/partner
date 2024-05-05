const { Router } = require("express");
const router = new Router();
const { extname } = require("path");
const postsController = require("../controllers/posts.controller");
const authMiddleware = require("../middleware/auth.middleware");
const multer = require("multer");

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
  limits: { fileSize: "1000000" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|svg/;
    const mimeType = fileTypes.test(file.mimetype);
    const extnameBool = fileTypes.test(extname(file.originalname));

    if (mimeType && extnameBool) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
});

router.get("/", postsController.getAllPosts);
router.get("/:id", postsController.getPostById);
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  postsController.createPost,
);
router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  postsController.updatePost,
);
router.delete("/:id", authMiddleware, postsController.deletePost);
module.exports = router;
