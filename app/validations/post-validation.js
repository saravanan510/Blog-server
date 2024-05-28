const postValidationSchema = {
  title: {
    in: ["body"],
    exists: {
      errorMessage: "Title is required ",
    },
    trim: true,
    notEmpty: {
      errorMessage: "Title should not be empty",
    },
  },
  content: {
    in: ["body"],
    exists: {
      errorMessage: "Content is required ",
    },
    trim: true,
    notEmpty: {
      errorMessage: "Content should not be empty",
    },
  },
  // author: {
  //   in: ["body"],
  //   exists: {
  //     errorMessage: "Author is required ",
  //   },
  //   trim: true,
  //   notEmpty: {
  //     errorMessage: "Author should not be empty",
  //   },
  // },
  // comments: {
  //   in: ["body"],
  //   isMongoId: {
  //     errorMessage: "Id should be valid mongoId",
  //   },
  // },
  // tags: {
  //   in: ["body"],
  //   isMongoId: {
  //     errorMessage: "Id should be valid mongoId",
  //   },
  // },
  // featuredImage: {
  //   in: ["body"],
  //   exists: {
  //     errorMessage: "Post image is required ",
  //   },
  //   trim: true,
  //   notEmpty: {
  //     errorMessage: "Post image should not be empty",
  //   },
  // },
};

module.exports = postValidationSchema;
