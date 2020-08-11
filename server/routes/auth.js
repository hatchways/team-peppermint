const router = require('express').Router();
const UserSchema = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Import dataService
const dataService = require('../data-modules/dataService');
const data = dataService();


//middleware validation
const {signupValidation, loginValidation} = require('../middleware/validation');


router.get('/', async (req, res) => {
  try {
    res.status(200).send("get route works!")
  } catch(err) {
    console.log(err);
  }
})

//signup route
router.post('/signup', async (req, res) => {
  //Valiate the data before adding new user
  const { error } = signupValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  console.log(req.body.email)
  //Check if the user is already in the database
  const emailExist = await UserSchema.findOne({email: req.body.email});

  if (emailExist) return res.status(400).send('Email already exists');
  //Hash the pass
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  // create a new user
  const user = new UserSchema({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });

  try {
    //save user
    const savedUser = await user.save();

    res.status(201).send(savedUser);
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
  const user = await UserSchema.findOne({email: req.body.email});
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