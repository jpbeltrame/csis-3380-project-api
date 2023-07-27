const userModel = require('../models/user')
const wishlistModel = require('../models/wishlist');
const APIError = require('../services/APIError');

const getProfileForWishList = async (req, res, next) => {
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

const getSettings = async (req, res, next) => {
  try {
    // Find the user by ID
    const user = await userModel.findById(req.params.id).exec();

    if (!user) {
      throw new APIError('User not found', 404);
    }

    // Send the entire user information in the response
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const setSettings = async (req, res, next) => {
  try {
    // Find the user by ID
    const user = await userModel.findById(req.params.id).exec();

    if (!user) {
      throw new APIError('User not found', 404);
    }

    // Update the user information with the new data from the request body
    const { name, login } = req.body;
    user.name = name;
    user.login = login;

    // Save the updated user object back to the database
    const updatedUser = await user.save();

    // Respond with the updated user's information in the response
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProfileForWishList,
  getSettings,
  setSettings,
}
