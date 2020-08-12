const Joi = require('@hapi/joi');

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
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required()
  });
  //Validate data before logging in
  return schema.validate(data);
}

module.exports.signupValidation = signupValidation;
module.exports.loginValidation = loginValidation;