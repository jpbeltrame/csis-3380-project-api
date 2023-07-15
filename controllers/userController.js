const userModel = require('../models/user')
const wishlistModel = require('../models/wishlist')

const getProfile = async (req, res, next) => {
  try {
    const public =  !(req.user && req.user.id && req.user.id == req.params.id);

    const user = await userModel.findById(req.params.id).exec();
    const wishlist = await wishlistModel.find({ public, user_id: req.params.id }).exec();
    const temp = {... user._doc, wishlist};

    res.json(temp);
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
