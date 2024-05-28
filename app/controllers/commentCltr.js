const Comment = require("../models/comment-model");
const BlogPost = require("../models/blogPost-model");
const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const { validationResult } = require("express-validator");
const commentCltr = {};

commentCltr.create = asyncErrorHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const body = req.body;
  console.log(body);
  body.author = req.user.id;
  body.post = req.params.postId;
  const comment = await Comment.create(body);
  if (comment) {
    const post = await BlogPost.findOneAndUpdate(
      { _id: req.params.postId },
      { $addToSet: { comments: comment._id } },
      { new: true }
    );
  }
  return res.status(201).json(comment);
});

commentCltr.show = asyncErrorHandler(async (req, res, next) => {
  const comments = await Comment.find({ post: req.params.postId });
  return res.json(comments);
});

commentCltr.update = asyncErrorHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const body = {
    content: req.body.content,
  };

  const comment = await Comment.findByIdAndUpdate(req.params.commentId, body, {
    new: true,
  });
  return res.json(comment);
});

commentCltr.delete = asyncErrorHandler(async (req, res, next) => {
  const comment = await Comment.findByIdAndDelete(req.params.commentId);
  if (comment) {
    const post = await BlogPost.findOneAndUpdate(
      { _id: req.params.postId },
      { $pull: { comments: comment._id } },
      { new: true }
    );
  }
  return res.json(comment);
});

module.exports = commentCltr;
