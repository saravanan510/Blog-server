const express = require("express");
const router = express.Router();
const { checkSchema } = require("express-validator");
const postValidationSchema = require("../app/validations/post-validation");
const commentValidationSchema = require("../app/validations/comment-validation");
const authenticateUser = require("../app/middlewares/authenticateUser");
const postCltr = require("../app/controllers/postCltr");
const commentCltr = require("../app/controllers/commentCltr");
const { featuredImageUpload } = require("../utils/fileUpload");
router.post(
  "/",
  authenticateUser,
  featuredImageUpload,
  checkSchema(postValidationSchema),
  postCltr.create
);

router.get("/", authenticateUser, postCltr.show);
router.get("/myposts", authenticateUser, postCltr.myPost);

router.get("/:id", authenticateUser, postCltr.singlePost);
router.put(
  "/:id",
  authenticateUser,
  featuredImageUpload,
  checkSchema(postValidationSchema),
  postCltr.updatePost
);
router.delete("/:id", authenticateUser, postCltr.deletePost);
router.post(
  "/:postId/comments",
  authenticateUser,
  checkSchema(commentValidationSchema),
  commentCltr.create
);
router.get("/:postId/comments", authenticateUser, commentCltr.show);
router.put(
  "/:postId/comments/:commentId",
  authenticateUser,
  checkSchema(commentValidationSchema),
  commentCltr.update
);
router.delete(
  "/:postId/comments/:commentId",
  authenticateUser,
  commentCltr.delete
);
module.exports = router;
