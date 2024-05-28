const User = require("../models/user-model");
const userRegisterValidationSchema = {
  username: {
    in: ["body"],
    exists: {
      errorMessage: "username is required",
    },
    trim: true,
    notEmpty: {
      errorMessage: "username should not be empty",
    },
  },
  email: {
    in: ["body"],
    exists: {
      errorMessage: "email is required",
    },
    trim: true,
    notEmpty: {
      errorMessage: "email should not be empty",
    },
    isEmail: {
      errorMessage: "email should be valid format",
    },
    normalizeEmail: true,
    custom: {
      options: async function (value) {
        const user = await User.findOne({ email: value });
        if (user) {
          throw new Error("user already registered");
        } else {
          return true;
        }
      },
    },
  },
  passwordHash: {
    in: ["body"],
    exists: {
      errorMessage: "password is required",
    },
    trim: true,
    notEmpty: {
      errorMessage: "password should not be empty",
    },
  },
  bio: {
    in: ["body"],
    exists: {
      errorMessage: "Bio is required",
    },
    trim: true,
    notEmpty: {
      errorMessage: "Bio should not be empty",
    },
  },
};

const userEditValidationSchema = {
  username: {
    in: ["body"],
    exists: {
      errorMessage: "username is required",
    },
    trim: true,
    notEmpty: {
      errorMessage: "username should not be empty",
    },
  },
  email: {
    in: ["body"],
    exists: {
      errorMessage: "email is required",
    },
    trim: true,
    notEmpty: {
      errorMessage: "email should not be empty",
    },
    isEmail: {
      errorMessage: "email should be valid format",
    },
    normalizeEmail: true,
  },
  passwordHash: {
    in: ["body"],
    exists: {
      errorMessage: "password is required",
    },
    trim: true,
    notEmpty: {
      errorMessage: "password should not be empty",
    },
  },
  bio: {
    in: ["body"],
    exists: {
      errorMessage: "Bio is required",
    },
    trim: true,
    notEmpty: {
      errorMessage: "Bio should not be empty",
    },
  },
};

const userLoginValidationSchema = {
  email: {
    in: ["body"],
    exists: {
      errorMessage: "email is required",
    },
    trim: true,
    notEmpty: {
      errorMessage: "email should not be empty",
    },
    isEmail: {
      errorMessage: "email should be valid format",
    },
    normalizeEmail: true,
  },
  password: {
    in: ["body"],
    exists: {
      errorMessage: "password is required",
    },
    trim: true,
    notEmpty: {
      errorMessage: "password should not be empty",
    },
  },
};

module.exports = {
  userRegisterValidationSchema,
  userEditValidationSchema,
  userLoginValidationSchema,
};
