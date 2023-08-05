const axios = require('axios');
const GOOGLE_BOOKS_API_URL = process.env.GOOGLE_BOOKS_API_URL;
const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

const $axios = axios.create({
    baseURL: GOOGLE_BOOKS_API_URL,
    timeout: 30000,
    params: {
        key: GOOGLE_BOOKS_API_KEY
    }
});

const search = (searchQuery, limit = 10, startIndex = 0, orderBy = 'relevance') => {
    const maxResults = limit > 40 ? 40 : limit;

    return $axios.get(
        'volumes', {
            params: {
              q: searchQuery,
              printType: 'books',
              startIndex,
              maxResults,
              orderBy
            },
        });
}

const getById = (bookId) => {
  try {
    return $axios.get(`volumes/${bookId}`);
  } catch (error) {
    return error.message;
  }
}

module.exports = {
    search,
    getById
} 
