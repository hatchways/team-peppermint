const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dataService = require('../data-modules/dataService');
const data = dataService();

//middleware to authenticate routes
const checkAuth = require('../middleware/checkAuth');

//middleware validation
const {signupValidation, loginValidation, generateToken} = require('../middleware/validation');

//signup route
router.post('/signup', async (req, res) => {
  
  //Valiate the data before adding new user
  const { error } = signupValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if the user is already in the database
  const user = await data.getUserByEmail(req.body.email);
  if(user) return res.status(400).send("User already exists");
  
  //Hash the pass
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  //set default language to english if none provided
  const prefLanguage = req.body.language ? req.body.language : 'english';
  // create a new user
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
    language: prefLanguage
  };  
  data.createUser(newUser)
    .then((msg)=>{
      res.status(201).send(msg);
      generateToken(res, user_.id);
    })
    .catch((err)=>{
      console.error(err);
      res.status(400).send("error"+err);
    })
})

//login route
router.post('/login', async (req, res) => {
  
  //validate the data before logging in
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if the user is already in the database
  const user = await data.getUserByEmail(req.body.email);
  if (!user) return res.status(400).send('Auth Failed');

  //checking password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Auth Failed');

  //set payload
  const payload = {
    name: req.body.name
  }
  //create and assign a token
  const token = jwt.sign(payload, process.env.TOKEN_SECRET);
  //create httpOnly cookie
  res.cookie('auth_token', token, {
    maxAge: 3600, // sets 1 hour in length
    httpOnly: true,
    // secure: true -> uncomment in production?
  });
  res.status(200).end();
});

router.get("/", checkAuth, (req, res, next) => {
  res.json({
    posts: {
      title: 'my first post',
      description: "only see if you're authenticated"
    }
  });
});

module.exports = router;