const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const userModel = require('../models/user');
const APIError = require('../services/APIError');

const signin = async (req, res, next) => {
 
  const { username, password } = req.body;
  if (username.length == 0 || password.length == 0) { 
    return next(new Error('Invalid fields'));
  }

  const user = await userModel
    .findOne({'login.username':username})
    .select('+login.password')
    .exec();

  if (!user) 
    return next(new APIError("", 401));

  const isPasswordValid = await bcrypt.compare(
    password, 
    user.login.password
  );
  
  if (!isPasswordValid) 
    return next(new APIError('Invalid fields', 401));

  user.login.password = '';
  const jwtToken = jsonwebtoken.sign(
    {name: user.name, id: user._id}, 
    process.env.TOKEN_SECRET, 
    { expiresIn: '1800s' }
  );

  return res.json({
    jwtToken
  });
}

const signup = async (req, res, next) => {
  try {
    console.log(req.body);
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
  
  try {
    if (!token) {
      throw new APIError(null ,401);
    }

    const user = await jsonwebtoken.verify(
      token, 
      process.env.TOKEN_SECRET
    );

    req.user = user;
    return next();
  } catch (error) {
    if (error instanceof APIError) {
      next(error)
    } else {
      next(new APIError(error.message, 403));
    }
  }
}

module.exports = {
  signin,
  signup,
  isAuthenticatedMiddleware
}