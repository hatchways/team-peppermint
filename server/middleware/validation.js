const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');

//Signup validation
const signupValidation = (data) => {
  //signup data
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required()
  });
  //validate data before making a user
  return schema.validate(data);
}

//login validation
const loginValidation = (data) => {
  //login data
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  });
  //Validate data before logging in
  return schema.validate(data);
}

const generateToken = (res, id) => {
  const expiration = process.env.DB_ENV === "testing" ? 100 : 60480000;
  const token = jwt.sign({ id}, process.env.TOKEN_SECRET, {
    expiresIn: process.env.DB_ENV === "testing" ? '1d' : '7d',
  });
  return res.cookie('token', token, {
    expires: new Date(Date.now() + expiration),
    secure: false,
    httpOnly: true,
  });
};



module.exports.signupValidation = signupValidation;
module.exports.loginValidation = loginValidation;
module.exports.generateToken = generateToken;