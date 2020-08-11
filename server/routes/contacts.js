const router = require("express").Router();
const Contact = require("../models/Contact");

//contacts route
router.get("/user/:id/contacts", async (req, res) => {
  try {
    //find contacts by user id
    const contacts = await Contact.find({ userId: req.body.userId });
    //response with contacts
    res.json(contacts);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
