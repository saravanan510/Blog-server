const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const tagSchema = new Schema({
  name: String,
  descriptions: String,
  posts: [{ type: Schema.Types.ObjectId, ref: "BlogPost" }],
});

const Tag = model("Tag", tagSchema);

module.exports = Tag;
