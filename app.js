const PORT = 3000;

const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router')

const app = express();

require('dotenv').config()

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(router);

// app.use(bodyParser.urlencoded({ extended: false }));
// app.set('view engine', 'ejs');

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});