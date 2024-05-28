const Tag = require("../models/tag-model");

const tagCltr = {};

tagCltr.create = async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.json(tag);
  } catch (err) {
    console.log(err);
  }
};

tagCltr.show = async (req, res) => {
  try {
    const tags = await Tag.find();
    return res.json(tags);
  } catch (err) {
    return res.status(500).json({ error: "internal server error" });
  }
};

tagCltr.update = async (req, res) => {
  try {
    const { tags, _id } = req.body;
    if (!Array.isArray(tags) || !_id) {
      return res.status(400).json({ error: "Invalid input data" });
    }
    const updatePromises = tags.map(async (tagId) => {
      const result = await Tag.findOneAndUpdate(
        { _id: tagId },
        { $addToSet: { posts: _id } },
        { new: true }
      );
      return result;
    });
    await Promise.all(updatePromises);
    return res.status(200).json({ message: "Tags updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = tagCltr;
