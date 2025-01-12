const AppError = require('../Utils/appError');

const handleValidationError = (err, res) => {
  return new AppError(err.message, 401);
};

const handleDuplicateValues = (err, res) => {
  const value = Object.keys(err.keyValue)[0];

  return new AppError(
    `Duplicate field value: "${value}". Please use another value!`,
    401
  );
};

const handleCastErrorDB = (error) => {
  const message = `Invalid ID / Data type for the given field`;
  return new AppError(message, 400);
};

const sendResponse = (err, res) => {
  res.status(err.statusCode).json({
    status: 'Fail',
    message: err.message,
  });
};

const globalErrorHandler = (err, req, res, next) => {
  if (err.name === 'CastError') err = handleCastErrorDB(err);
  if (err.code === 11000) err = handleDuplicateValues(err, res);
  if (err.name === 'ValidationError') err = handleValidationError(err, res);

  console.log(err);
  sendResponse(err, res);
};

module.exports = { globalErrorHandler };
