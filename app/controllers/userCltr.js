const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const JWT = require("jsonwebtoken");
const User = require("../models/user-model");
const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const CustomError = require("../../utils/customError");

const userCltr = {};

userCltr.create = asyncErrorHandler(async (req, res, next) => {
  const salt = await bcryptjs.genSalt();
  const encryptPassword = await bcryptjs.hash(req.body.passwordHash, salt);
  const body = req.body;
  body.passwordHash = encryptPassword;
  if (!req.file) {
    return res
      .status(400)
      .json({ errors: [{ errors: "Profile picture is required" }] });
  }
  body.profilePicture = req.file.filename;
  const user = await User.create(body);
  return res.status(201).json(user);
});

userCltr.login = asyncErrorHandler(async (req, res, next) => {
  console.log(req.body);
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const isAuth = await bcryptjs.compare(req.body.password, user.passwordHash);
    if (isAuth) {
      const tokenData = {
        id: user._id,
      };
      const token = JWT.sign(tokenData, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.json({ token: token });
    }
    return res.status(404).json({ errors: "invalid email / password " });
  }
  return res.status(404).json({ errors: "invalid email / password " });
});

userCltr.show = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  return res.json(user);
});

userCltr.update = asyncErrorHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const body = req.body;
  body.profilePicture = req.file.filename;
  const user = await User.findByIdAndUpdate(req.user.id, body, {
    new: true,
  });
  return res.json(user);
});

module.exports = userCltr;
