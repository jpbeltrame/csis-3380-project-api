const router = require('express').Router();
const authController = require('./controllers/authController'); 
const bookController = require('./controllers/bookController'); 
const userController = require('./controllers/userController'); 
const wishlistController = require('./controllers/wishlistController');

/**
 * Public Routes
 */
router.post('/auth/signin', authController.signin);
router.post('/auth/signup', authController.signup);

router.get('/books', bookController.search);
router.get('/books/:id', bookController.get);
router.get('/users/profile/:id', userController.getProfile);

/**
 * Restricted Routes
 */
router.use(authController.isAuthenticatedMiddleware);

router.get('/user/settings', userController.getSettings);
router.put('/user/settings', userController.setSettings);

router.get('/wishlist', wishlistController.list);
router.post('/wishlist', wishlistController.create);
router.get('/wishlist/:id', wishlistController.get);
router.post('/wishlist/:id', wishlistController.create);
router.put('/wishlist/:id', wishlistController.update);
router.delete('/wishlist/:id', wishlistController.remove);
router.post('/wishlist/:id/book', wishlistController.addBook);
router.delete('/wishlist/:id/book', wishlistController.removeBook);

module.exports = router;