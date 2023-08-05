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

// Route to check if a book exists in all wishlists for a user
const checkItemInWishlist = async (req, res, next) => {
  try {
    const { userId, bookId } = req.params;
    const wishlists = await wishlistModel.find({ user_id: userId });

    if (wishlists.length === 0) {
      return res.json({ isInWishlist: false });
    }

    const isInWishlist = wishlists.some((wishlist) => wishlist.book === bookId);

    res.json({ isInWishlist });
  } catch (error) {
    next(error);
  }
}

//ADDED ENDPOINT
// Route to remove books from the wishlist of the user
const removeBookOfWishlist = async (req, res, next) => {
  const { userId, bookId } = req.params;

  try {
    // Find the wishlist entry with the given user ID and book ID and delete it
    const deletedEntry = await wishlistModel.findOneAndDelete({
      user_id: userId,
      book: bookId,
    });

    if (!deletedEntry) {
      return res.status(404).json({ message: 'Book not found in wishlist.' });
    }

    return res.status(200).json({ message: 'Book removed from wishlist successfully.' });
  } catch (error) {
    console.error('Error removing book from wishlist:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

const create = async (req, res, next) => {
  try {
    const { user_id, name, public, book } = req.body;

    const wishlist = await wishlistModel.create({
      name,
      public,
      user_id,
      book, // Store the book ID in the wishlist's books array
    });
    res.json(wishlist);

  } catch (error) {
    next(error);
  }
}

const update = async (req, res, next) => {
  try {
    const wishlistId = req.params.id;
    const userId = req.user.id;
    const { name, public } = req.body;

    await wishlistModel
      .updateOne({ user_id: userId, _id: wishlistId }, { name, public });

    const wishlist = await wishlistModel
      .findById(wishlistId)
      .exec();

    res.json(wishlist);

  } catch (error) {
    next(error);
  }
}

const remove = (req, res, next) => {
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
  checkItemInWishlist,
  removeBookOfWishlist
}
