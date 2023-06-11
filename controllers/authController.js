const bcrypt = require('bcrypt');
const userModel = require('../models/user');

const signin = async (req, res) => {
  
  const { username, password }  = {... req.body}

  const user = await userModel
    .findOne({'login.username':username})
    .select('+login.password')
    .exec();


  res.json(user);
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

const isAuthenticatedMiddleware = (req, res, next) => {
  next();
}

module.exports = {
  signin,
  signup,
  isAuthenticatedMiddleware
}