const multer = require("multer");

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Create the multer instance
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
});

//Handle multer Error
const handleUpload = (uploadType) => (req, res, next) => {
  upload.single(uploadType)(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ errors: err.message });
    } else if (err) {
      return res.status(400).json({ errors: err.message });
    }
    next();
  });
};

const profilePictureUpload = handleUpload("profilePicture");
const featuredImageUpload = handleUpload("featuredImage");
module.exports = { profilePictureUpload, featuredImageUpload };
