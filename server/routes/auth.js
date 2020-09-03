const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const dataService = require("../data-modules/dataService");
const data = dataService();

//middleware to authenticate routes
const checkAuth = require("../middleware/checkAuth");

//middleware validation
const {
  signupValidation,
  loginValidation,
  generateToken,
} = require("../middleware/validation");
const UserSchema = require("../models/userSchema");

//signup route
router.post("/signup", async (req, res) => {
  try {
    let { name, email, password, language, referrer } = req.body;
    if (!name || !email || !password)
      return res
        .status(400)
        .json({ msg: "Not all the fields have been entered." });

    if (password.length < 6)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 6 characters long." });

    //Check if the user is already in the database
    const user = await data.getUserByEmail(email);
    if (user)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });
    //set default language to english if none provided
    const prefLanguage = language ? language : "english";
    // create a new user
    const newUser = {
      name: name,
      email: email,
      password: password,
      language: prefLanguage,
    };
    data
      .createUser(newUser)
      .then(async (user) => {
        // res.status(201).send(msg);

        //create and assign a token
        const token = jwt.sign(email, process.env.TOKEN_SECRET);
        //create httpOnly cookie
        res.cookie("auth_token", token, {
          maxAge: 3600, // sets 1 hour in length
          httpOnly: true,
          // secure: true -> uncomment in production?
        });
        if (referrer) {
          // Data of the user who sent a referral link
          const userData = await data.getUserById(referrer);
          await data.addContact(userData.email, user.email);
        }
        newUser._id = user._id;
        res.status(200).json({ token, newUser });
      })
      .catch((err) => {
        console.error(err);
        res.status(400).send("error" + err);
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//login route
router.post("/login", async (req, res) => {
  try {
    //validate the data before logging in
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).json({ msg: error.details[0].message });

    //check if the user is already in the database
    const user = await data.getUserByEmail(req.body.email);
    if (!user)
      return res.status(400).json({ msg: "No account with this email found." });

    //checking password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);

    if (!validPass)
      return res.status(400).json({ msg: "Invalid credentials." });

    //create and assign a token
    const token = jwt.sign({ id: user.email }, process.env.TOKEN_SECRET);
    //create httpOnly cookie
    res.cookie("auth_token", token, {
      maxAge: 2 * 60 * 60 * 1000, // sets 1 hour in length
      httpOnly: true,
      // secure: true -> uncomment in production?
    });
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        language: user.language,
        pictureURL: user.pictureURL,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete", checkAuth, async (req, res) => {
  try {
    const deletedUser = await data.deleteByEmail(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/getCookie", async (req, res) => {
  try {
    const token = req.cookies.auth_token;
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!verified) return res.json(false);

    const user = await data.getUserByEmail(verified.id);
    if (!user) return res.json(false);

    //create httpOnly cookie
    res.cookie("auth_token", token, {
      maxAge: 3600, // sets 1 hour in length
      httpOnly: true,
      // secure: true -> uncomment in production?
    });
  } catch {
    res.status(500).json({ error: err.message });
  }
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);
    console.log("token: " + token);
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log("verified: ", verified);
    if (!verified) return res.json(false);

    const user = await data.getUserByEmail(verified.id);
    if (!user) return res.json(false);
    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", checkAuth, async (req, res) => {
  data
    .getUserByEmail(req.user)
    .then((user) => {
      res.json({
        name: user.name,
        id: user._id,
        email: user.email,
        language: user.language,
        pictureURL: user.pictureURL,
      });
    })
    .catch((err) => res.json(err));
});
router.get("/:users/languages", (req, res) => {
  let users = req.params.users.split(',');
  data.getUsers(users)
    .then((users) => {
      let languages = users.map((user) => {
        return user.language
      }).filter((value, index, self) => {
        return self.indexOf(value) === index;
      })
      res.status(200).json({ languages: languages })
    })
    .catch((err) => res.status(400).json(err))
})
router.get("/:email", (req, res) => {
  data.getUserByEmail(req.params.email)
    .then((user) => {
      if(user)
      res.status(200).json({
        email: user.email,
        name: user.name,
        pictureUrl: user.pictureURL,
        language: user.language
      })
      else
      res.status(404).send("User not found");
    })
    .catch((err) => res.status(400).json({ error: err }))
})

module.exports = router;
