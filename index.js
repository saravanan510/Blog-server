const express = require("express");
const cors = require("cors");
const compression = require("compression");
var fs = require("fs");
// var morgan = require("morgan");
var path = require("path");

require("dotenv").config();
const connectdb = require("./config/db");
const errorHandler = require("./utils/errorHandler");
const CustomError = require("./utils/customError");

const userRoutes = require("./routes/user-routes");
const postRoutes = require("./routes/post-routes");
const tagRoutes = require("./routes/tag-routes");

const app = express();
const port = process.env.PORT || 8888;

app.use(express.json());
app.use(cors());
app.use(compression());
app.use(
  "/public/images",
  express.static(path.join(__dirname, "public/images"))
);

// var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
//   flags: "a",
// });

// app.use(morgan("tiny", { stream: accessLogStream }));
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/tags", tagRoutes);

app.use("*", (req, res, next) => {
  const error = new CustomError(
    404,
    `route not found at path ${req.originalUrl}`
  );
  next(error);
});
app.use(errorHandler);

app.listen(port, () => {
  connectdb();
  console.log("server running successfully on port", port);
});
