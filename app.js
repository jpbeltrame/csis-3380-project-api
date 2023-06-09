require('dotenv').config();

const PORT = 3000;
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./router')

mongoose.connect(process.env.MONGO_DB_URL);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(process.env.MONGO_DB_URL)
  console.log(error);
});

const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(router);

// app.use(bodyParser.urlencoded({ extended: false }));
// app.set('view engine', 'ejs');

database.once('connected', () => {
  console.log('Database Connected');
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
});