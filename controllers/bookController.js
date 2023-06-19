const bookService = require("./../services/bookService");

const search = async (req, res) => {
  try {
    let response = await bookService.search()
    res.json(response.data);
  } catch (err) {
    console.log(err);
  }
}

const getBookDetails = (req, res) => {
  res.json({});
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
  getBookDetails,
  addReview,
  getReview,
  addProgress,
  getProgress
}
