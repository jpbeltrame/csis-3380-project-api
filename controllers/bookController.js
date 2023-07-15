const bookService = require("./../services/bookService");

const search = async (req, res, next) => {
  try {
    let {query, limit = 10, offset = 0} = req.body;

    if (query == '') {
      throw new Error('Invalid param query')
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

module.exports = {
  search,
  get
}
