const router = require("express").Router();
const Invitaion = require("../models/Invitaion");

//get invitation route
router.get("/user/:id/invitations", async (req, res) => {
  try {
    //get all invitatitions by user id
    const invitations = await Invitation.find({ To_user: req.body.userEmail });
    //send response with invitations
    res.json(invitaions);
  } catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = router;
