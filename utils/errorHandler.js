const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    errors: err.message,
    stack: err.stack,
  });
};

module.exports = errorHandler;
