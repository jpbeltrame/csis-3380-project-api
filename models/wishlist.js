const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    require: true
  },
  public: {
    type: Boolean,
    require: true
  },
  // books: mongoose.Schema.Types.Mixed
  book: {
    type: String,
    required: true,
  },
});

const wishlistModel = mongoose.model('wishlist', wishlistSchema);

module.exports = wishlistModel;