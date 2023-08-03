const router = require('express').Router();
const authController = require('./controllers/authController'); 
const bookController = require('./controllers/bookController'); 
const userController = require('./controllers/userController'); 
const wishlistController = require('./controllers/wishlistController');

const errorHandler = require('./controllers/errorHandler');

/**
 * Public Routes
 */
router.post('/auth/signin', authController.signin);
router.post('/auth/signup', authController.signup);

router.get('/books', bookController.search);
router.get('/booksWithQuery', bookController.searchWithQuery);
router.get('/books/:id', bookController.get);
router.get('/books/:id/reviews', bookController.getReview);

router.get('/users/profile/:id', userController.getSettings);
router.post('/users/profile/:id', userController.setSettings);
router.get('/users/profile/wishlist/:userId', userController.getProfileForWishList);


//OLD ENDPOINTS FOR WISHLIST
router.get('/wishlist', wishlistController.list);
router.post('/wishlist', wishlistController.create);
router.get('/wishlist/:id', wishlistController.get);
//NEW ENDPOINT FOR CHECK WISHLIST
router.get('/wishlist/:userId/:bookId', wishlistController.checkItemInWishlist);
//
router.put('/wishlist/:id', wishlistController.update);
router.delete('/wishlist/:id', wishlistController.remove);

router.post('/wishlist/:id/book', wishlistController.addBook);
router.delete('/wishlist/:id/book', wishlistController.removeBook);

/**
 * Restricted Routes
 */
router.use(authController.isAuthenticatedMiddleware);

router.get('/user/settings', userController.getSettings);
router.put('/user/settings', userController.setSettings);

router.get('/books/:id/progress', bookController.getProgress);
router.post('/books/:id/progress', bookController.addProgress);
router.post('/books/:id/reviews', bookController.addReview);

// router.get('/wishlist', wishlistController.list);
// router.post('/wishlist', wishlistController.create);
// router.get('/wishlist/:id', wishlistController.get);
// router.put('/wishlist/:id', wishlistController.update);
// router.delete('/wishlist/:id', wishlistController.remove);

// router.post('/wishlist/:id/book', wishlistController.addBook);
// router.delete('/wishlist/:id/book', wishlistController.removeBook);

router.use(errorHandler.handler);

module.exports = router;