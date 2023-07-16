const APIError = require("../services/APIError");

const handler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  let errorCode = 500; 
  if (err instanceof APIError)
    errorCode = err.httpCode;

  res.status(errorCode)
    .json({ error: err.message });
};

module.exports = { handler };
