const router = require("express").Router();
const Conversation = require("../models/Conversation");

//conversation route
router.get("/user/:id/conversations", async (req, res) => {
  try {
    //save user
    const conversations = await Conversation.find({ userId: req.body.userId });
    //only send back the id, not the whole user object
    res.json(conversations);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
