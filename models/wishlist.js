const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    require: true
  },
  public: {
    type: Boolean,
    require: true
  },
  books: mongoose.Schema.Types.Mixed
});

const wishlistModel = mongoose.model('wishlist', wishlistSchema);

module.exports = wishlistModel;