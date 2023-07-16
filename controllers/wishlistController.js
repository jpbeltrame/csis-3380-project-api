const wishlistModel = require('../models/wishlist');
const APIError = require('../services/APIError');

const list = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const wishlist = await wishlistModel
      .find({ user_id: userId })
      .select(['name', 'id', 'public'])
      .exec();

    res.json(wishlist);
  } catch (error) {
    next(error);
  }
}

const get = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const wishlistId = req.params.id;

    const wishlist = await wishlistModel
      .findById(wishlistId)
      .exec();

    if (!wishlist || (!wishlist.public && userId != wishlist.user_id))
      throw new APIError("not found", 404);

    res.json(wishlist);

  } catch (error) {
    next(error);
  }
}

const create = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name, public } = req.body;


    console.log(userId);

    const wishlist = await wishlistModel
      .create({ name, public, user_id: userId });

    res.json(wishlist);

  } catch (error) {
    next(error);
  }
}

const remove = (req, res, next) => {
  res.json({});
}

const update = (req, res, next) => {
  res.json({});
}

const addBook = (req, res, next) => {
  res.json({});
}

const removeBook = (req, res, next) => {
  res.json({});
}

module.exports = {
  list,
  get,
  remove,
  update,
  create,
  addBook,
  removeBook,
}
