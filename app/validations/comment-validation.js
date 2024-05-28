const commentValidationSchema = {
  content: {
    in: ["body"],
    exists: {
      errorMessage: "Content is required",
    },
    trim: true,
    notEmpty: {
      errorMessage: "Content should not be empty",
    },
  },
};

module.exports = commentValidationSchema;
