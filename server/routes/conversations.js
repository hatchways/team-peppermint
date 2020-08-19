const router = require("express").Router();
const data = require("../data-modules/dataService")();
const checkAuth = require('../middleware/checkAuth');
//conversation route
router.get("/:email/conversations", checkAuth, async (req, res) => {
  try {
    const conversations = await data.getConversations(req.params.email);
    if(conversations.length===0) res.send("You do not have conversations"); 
    else res.json(conversations);
  } catch (err) {
    res.status(400).json(err);
  }
});
router.post("/:email/conversation", checkAuth, async (req,res)=>{
    let users = req.body;
    let conversation = {
      conversationID: users.join('-'),
      users: users
    }
    data.createConversation(conversation)
    .then((msg)=>res.send(msg))
    .catch((err)=>res.send(err))
})

module.exports = router;
