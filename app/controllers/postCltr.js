const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const { validationResult } = require("express-validator");
const BlogPost = require("../models/blogPost-model");
const postCltr = {};

postCltr.create = asyncErrorHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const body = req.body;
  (body.author = req.user.id), (body.featuredImage = req.file.filename);
  const blogPost = await BlogPost.create(body);
  res.status(201).json(blogPost);
});

postCltr.show = asyncErrorHandler(async (req, res, next) => {
  const posts = await BlogPost.find().populate("author").populate("tags");
  res.json(posts);
});

postCltr.singlePost = asyncErrorHandler(async (req, res, next) => {
  const id = req.params.id;
  const post = await BlogPost.findById(id)
    .populate("author")
    .populate("tags")
    .populate({
      path: "comments",
      populate: { path: "author" },
    });
  res.json(post);
});

postCltr.updatePost = asyncErrorHandler(async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  (body.author = req.user.id), (body.featuredImage = req.file.filename);
  const post = await BlogPost.findByIdAndUpdate(id, body, { new: true });
  return res.json(post);
});

postCltr.deletePost = asyncErrorHandler(async (req, res, next) => {
  const id = req.params.id;
  const post = await BlogPost.findByIdAndDelete(id);
  return res.json(post);
});

postCltr.myPost = asyncErrorHandler(async (req, res, next) => {
  const authorId = req.user.id;
  console.log(authorId);
  const myposts = await BlogPost.find({ author: authorId });
  res.json(myposts);
});

module.exports = postCltr;
