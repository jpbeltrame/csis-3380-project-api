class APIError extends Error {
  httpCode = 500;

  constructor(message, httpCode) {
    super(message);
    this.httpCode = httpCode;
  }
}

module.exports = APIError;