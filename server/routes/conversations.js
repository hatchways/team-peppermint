const router = require("express").Router();
const data = require("../data-modules/dataService")();
const checkAuth = require("../middleware/checkAuth");
//conversation route
router.get("/:email/conversations", checkAuth, async (req, res) => {
  try {
    const conversations = await data.getConversations(req.params.email);
    if (conversations.length === 0) res.send("You do not have conversations");
    else res.json(conversations);
  } catch (err) {
    res.status(400).json(err);
  }
});
router.post("/conversation", async (req, res) => {
  let users = req.body;
  if (users.length > 1)
    data.createConversation(users)
      .then((msg) => res.status(200).json(msg))
      .catch((err) => {

        if (err.code === 11000) {
          return res.status(400).json({ error: err, code: err.code })
        }
        return res.status(500).json(err)
      })
  else
    res.status(400).json({ message: "More than one user required to create conversation" })
})
router.get("/conversation/:convID", async (req, res) => {
  try {
    let conversation = await data.getConversationById(req.params.convID);

    if (!conversation)
      return res
        .status(404)
        .json({ found: false, msg: "conversation not found" });
    return res.status(200).json({ conversation });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});
router.post("/:email/conversation/:convID/newMessage", async (req, res) => {
  let newMessage = req.body;
  data.addMessage(req.params.convID, newMessage)
    .then((msg) => res.status(200).json(msg))
    .catch((err) => res.status(500).json(err));
});
router.get("/:email/groupchats", (req, res) => {
  data
    .getUserByEmail(req.params.email)
    .then((user) => {
      res.status(200).send(user.groupChats)
    })
    .catch((err) => res.status(400).send(err));
})
router.get("/:email/groupchat/:groupid", (req, res) => {

})
router.post("/groupchat", (req, res) => {
  let users = req.body;
  Promise.all([
    data.addGroupChat(users),
    data.createConversation(users)
  ])
    .then((msg) => res.status(200).json(msg))
    .catch((err) => res.status(500).json(err));
});
module.exports = router;
