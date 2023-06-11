const bookService = require("./../services/bookService");

const search = async (req, res) => {
  try {
    let response = await bookService.search()
    res.json(response.data);
  } catch (err) {
    console.log(err);
  }
}

const get = (req, res) => {
  res.json({});
}

module.exports = {
  search,
  get
}
