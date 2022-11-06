// @desc this class is responsible about operation errors ( errors that i can predict )

class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(4) ? "fail" : "error";
  }
}

module.exports = APIError;
