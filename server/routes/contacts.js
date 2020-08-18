const router = require("express").Router();
const data = require("../data-modules/dataService")();
router.get("/:email/contacts", async (req, res) => {
  try {
    //find contacts by user id
    const user = await data.getUserByEmail(req.params.email);

    //response with contacts
    res.status(200).send(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
