const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const blogPostSchema = new Schema(
  {
    title: String,
    content: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    featuredImage: String,
  },
  { timestamps: true }
);

const BlogPost = model("BlogPost", blogPostSchema);

module.exports = BlogPost;
