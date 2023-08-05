const userModel = require('../models/user')
const wishlistModel = require('../models/wishlist');
const APIError = require('../services/APIError');

// Route to get distinct bookIds for a user's wishlist
const getProfileForWishList = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const distinctBooks = await wishlistModel.distinct('book', { user_id: userId });
    res.json({ distinctBooks });
  } catch (err) {
    next(err);
  }
}

const getSettings = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id).exec();

    if (!user) {
      throw new APIError('User not found', 404);
    }

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
