require('dotenv').config();

const PORT = 3000;
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./router')

async function init() {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL + process.env.MONGO_DB_NAME, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      autoIndex: true
    });

    const app = express();

    app.use(bodyParser.json());
    app.use(express.static(__dirname + '/public'));
    app.use(router);
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });

  } catch (err) {
    console.log(process.env.MONGO_DB_URL)
    console.log(err);
  }
}

init();