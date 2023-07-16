const userModel = require('../models/user')
const wishlistModel = require('../models/wishlist');
const APIError = require('../services/APIError');

const getProfile = async (req, res, next) => {
  try {
    const public =  !(req.user && req.user.id && req.user.id == req.params.id);

    const user = await userModel
      .findById(req.params.id)
      .select('name')
      .exec();

    if (!user) { 
      throw new APIError('not found', 404);
    }

    const wishlist = await wishlistModel
      .find({ public, user_id: req.params.id })
      .exec();

    res.json({... user._doc, wishlist});
  } catch (err) {
    next(err)
  }
}

const getSettings = (req, res) => {
  res.json({});
}

const setSettings = (req, res) => {
  res.json({});
}

module.exports = {
  getProfile,
  getSettings,
  setSettings,
}
