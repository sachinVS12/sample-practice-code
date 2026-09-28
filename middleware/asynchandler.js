const { Error } = require("mongoose");

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
module.exports = asyncHandler;

class ErrorResponse extends Error {
  constructor(message, statuscode) {
    super(message);
    this.statuscode = statuscode;
    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = ErrorResponse;
