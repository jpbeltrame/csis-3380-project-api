const APIError = require("../services/APIError");
const bookService = require("./../services/bookService");

const search = async (req, res, next) => {
  try {
    let {query, limit = 10, offset = 0} = req.body;
    if (query == '') {
      throw new APIError('Invalid param query', 404)
    }

    let response = await bookService.search(query, limit, offset);

    res.json(response.data);
  } catch (err) {
    next(err);
  }
}
const searchWithQuery = async (req, res, next) => {
  try {
    let {query, limit = 10, offset = 0} = req.query;
    if (query == '') {
      throw new APIError('Invalid param query', 404)
    }

    let response = await bookService.search(query, limit, offset);

    res.json(response.data);
  } catch (err) {
    next(err);
  }
}

const get = async (req, res, next) => {
  try {
    const bookId = req.params.id
    const response = await bookService.getById(bookId);

    res.json(response.data);
  } catch (error) {
    next(error);
  }
}

const addReview = (req, res) => {
  res.json({});
}
const getReview = (req, res) => {
  res.json({});
}

const addProgress = (req, res) => {
  res.json({});
}
const getProgress = (req, res) => {
  res.json({});
}

module.exports = {
  search,
  searchWithQuery,
  get, 
  addReview,
  getReview,
  addProgress,
  getProgress
}
