# csis-3380-project-api

## Pre requisites

- **Node.js**
- **Mongodb**
- **Google Books API Key**
    Read https://developers.google.com/books/docs/v1/using to generate one 

## Running 

After cloning the the repository 

1. Install the dependencies with the comand `npm install`
2. Rename the `.env.sample` to `.env` and insert the proper values for the configs 
3. Run the command `node app.js` to start the server

If all works you should see the following message on the console 

```
$ Database Connected
$ App listening on port 3000
```

## API Structure 

This project is based on the MVC (Model, View, Controller) patern.

## API endpoints available

| method | Relative Path | Function | 
|---|---|---|
| POST | '/auth/signin' | authController.signin |
| POST | '/auth/signup' | authController.signup |
| GET | '/books' | bookController.search |
| GET | '/booksWithQuery' | bookController.searchWithQuery |
| GET | '/books/:id' | bookController.get |
| GET | '/books/:id/reviews' | bookController.getReview |
| POST | '/books/:id/reviews' | bookController.addReview |
| GET | '/users/profile/:id' | userController.getSettings |
| POST | '/users/profile/:id' | userController.setSettings |
| GET | '/users/profile/wishlist/:userId' | userController.getProfileForWishList |
| GET | '/wishlist' | wishlistController.list |
| POST | '/wishlist' | wishlistController.create |
| GET | '/wishlist/:id' | wishlistController.get |
| PUT | '/wishlist/:id' | wishlistController.update |
| DELETE | '/wishlist/:id' | wishlistController.remove |
| POST | '/wishlist/:id/book' | wishlistController.addBook |
| DELETE | '/wishlist/:id/book' | wishlistController.removeBook |
| GET | '/user/settings' | userController.getSettings |
| PUT | '/user/settings' | userController.setSettings |


## Third party API

For this project only the [Google Books](https://developers.google.com/books) books API were used