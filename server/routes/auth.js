const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const dataService = require('../data-modules/dataService');
const data = dataService();

//middleware to authenticate routes
const checkAuth = require('../middleware/checkAuth');

//middleware validation
const {signupValidation, loginValidation, generateToken} = require('../middleware/validation');
const UserSchema = require('../models/userSchema');

//signup route
router.post('/signup', async (req, res) => {
  try {
    let {name, email, password, language} = req.body;

    if (!name || !email || !password)
      return res.status(400).json({msg: "Not all the fields have been entered."});

    if (password.length < 6)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 6 characters long." });

    //Check if the user is already in the database
    const user = await data.getUserByEmail(email);
    if(user) 
      return res.status(400).json({ msg: "An account with this email already exists."});
    
    //Hash the pass
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    //set default language to english if none provided
    const prefLanguage = language ? language : 'english';
    // create a new user
    const newUser = {
      name: name,
      email: email,
      password: hashPassword,
      language: prefLanguage
    };  
    data.createUser(newUser)
      .then(()=>{
        // res.status(201).send(msg);
        
        //create and assign a token
        const token = jwt.sign(email, process.env.TOKEN_SECRET);
        //create httpOnly cookie
        res.cookie('auth_token', token, {
          maxAge: 3600, // sets 1 hour in length
          httpOnly: true,
          // secure: true -> uncomment in production?
        });
        res.status(200).json({token, newUser});
      })
      .catch((err)=>{
        console.error(err);
        res.status(400).send("error"+err);
      })
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

//login route
router.post('/login', async (req, res) => {
  try {
    //validate the data before logging in
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).json({msg: error.details[0].message});

    //check if the user is already in the database
    const user = await data.getUserByEmail(req.body.email);
    if (!user) return res.status(400).json({msg:'No account with this email found.'});

    //checking password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).json({msg: 'Invalid credentials.'});

    //create and assign a token
    const token = jwt.sign({id: user.email}, process.env.TOKEN_SECRET);
    //create httpOnly cookie
    res.cookie('auth_token', token, {
      maxAge: 3600, // sets 1 hour in length
      httpOnly: true,
      // secure: true -> uncomment in production?
    });
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/delete', checkAuth, async (req, res) => {
  try {
    const deletedUser = await data.deleteByEmail(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", checkAuth, (req, res, next) => {
  res.json({
    posts: {
      title: 'my first post',
      description: "only see if you're authenticated"
    }
  })
});

router.get('/getCookie', async (req, res) => {
  try {
    const token = req.cookies.auth_token;
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    if (!verified) return res.json(false);

    const user = await data.getUserByEmail(verified.id);
    if (!user) return res.json(false);

    //create httpOnly cookie
    res.cookie('auth_token', token, {
      maxAge: 3600, // sets 1 hour in length
      httpOnly: true,
      // secure: true -> uncomment in production?
    });
  } catch {
    res.status(500).json({ error: err.message })
  }
})

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);
    console.log("token: " + token);
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log("verified: " + verified);
    if (!verified) return res.json(false);

    const user = await data.getUserByEmail(verified.id);
    if (!user) return res.json(false);
    console.log("user: " + user);
    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", checkAuth, async (req, res) => {
  const user = data.getUserByEmail(req.user);
  res.json({
    name: user.name,
    id: user._id
  });
})

module.exports = router;