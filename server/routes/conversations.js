const router = require("express").Router();
const data = require("../data-modules/dataService")();

//conversation route
router.get("/:email/conversations", async (req, res) => {
  try {
    const conversations = await data.getConversations(req.params.email);
    if(conversations.length===0) res.send("You do not have conversations"); 
    else res.json(conversations);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
