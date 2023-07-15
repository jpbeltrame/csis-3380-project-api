const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const userModel = require('../models/user');

const signin = async (req, res, next) => {
 
  const { username, password } = req.body;
  if (username.length == 0 || password.length == 0) { 
    return next(new Error('Invalid fields'));
  }

  const user = await userModel
    .findOne({'login.username':username})
    .select('+login.password')
    .exec();

  const isPasswordValid = await bcrypt.compare(
    password, 
    user.login.password
  );
  
  if (!isPasswordValid) 
    return next(new Error('Invalid fields'));

  user.login.password = '';
  const jwtToken = jsonwebtoken.sign(
    {name: user.name}, 
    process.env.TOKEN_SECRET, 
    { expiresIn: '1800s' }
  );

  return res.json({
    jwtToken
  });
}

const signup = async (req, res, next) => {
  try {
    const user = new userModel({
      name: req.body.name,
      login: {
        username: req.body.username,
        password: req.body.password,
      }
    });

    const errors = user.validateSync();
    if (errors) {
      throw errors;
    }

    user.login.password = await bcrypt.hash(
      req.body.password, 
      10
    );

    await user.save();

    res.json(user);

  } catch (err) {
    next(err);
  }
}

const isAuthenticatedMiddleware = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) 
    return res.sendStatus(401)

  try {
    user = await jsonwebtoken.verify(
      token, 
      process.env.TOKEN_SECRET
    );
  } catch (err) {
    return res.sendStatus(403);
  }

  req.user = user;

  return next();
}

module.exports = {
  signin,
  signup,
  isAuthenticatedMiddleware
}