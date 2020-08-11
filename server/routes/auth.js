const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//middleware validation
const {signupValidation, loginValidation} = require('../middleware/validation');


//signup route
router.post('/signup', async (req, res) => {
  //Valiate the data before adding new user
  const { error } = signupValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if the user is already in the database
  const emailExist = await User.findOne({email: req.body.email})
  if (emailExist) return res.status(400).send('Email already exists');

  //Hash the pass
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });

  try {
    //save user
    const savedUser = await user.save();
    //only send back the id, not the whole user object
    res.send({user: user._id});
  } catch(err) {
    res.status(400).send(err);
  }
})

//login route
router.post('/login', async (req, res) => {
  //validate the data before logging in
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if the user is already in the database
  const user = await User.findOne({email: req.body.email});
  if (!user) return res.status(400).send('Email not found');

  //checking password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password)
  if (!validPass) return res.status(400).send('Invalid password');

  //create and assign a token
  try {
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
  } catch (err) {
    console.log(err)
  }
});

module.exports = router