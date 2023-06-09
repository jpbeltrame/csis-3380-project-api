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

const search = (searchQuery) => {
    return $axios.get(
        'volumes', {
            params: {q: searchQuery}
        });
}

const get = (bookId) => {}

module.exports = {
    search,
    get
} 
