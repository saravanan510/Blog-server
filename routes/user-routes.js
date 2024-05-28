const express = require("express");
const router = express.Router();
const { checkSchema } = require("express-validator");
const { profilePictureUpload } = require("../utils/fileUpload");
const validationErrorHandler = require("../utils/validationErrorHandler");

const {
  userRegisterValidationSchema,
  userEditValidationSchema,
  userLoginValidationSchema,
} = require("../app/validations/user-validation");

const userCltr = require("../app/controllers/userCltr");
const authenticateUser = require("../app/middlewares/authenticateUser");

router.post(
  "/register",
  profilePictureUpload,
  checkSchema(userRegisterValidationSchema),
  validationErrorHandler,
  userCltr.create
);
router.post(
  "/login",
  checkSchema(userLoginValidationSchema),
  validationErrorHandler,
  userCltr.login
);
router.get("/profile", authenticateUser, userCltr.show);
router.put(
  "/profile",
  authenticateUser,
  profilePictureUpload,
  checkSchema(userEditValidationSchema),
  validationErrorHandler,
  userCltr.update
);

module.exports = router;
