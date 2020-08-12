const router = require("express").Router();
const data = require('../data-modules/dataService')();

//contacts route
router.post("/:email/invite", async (req, res) => {
    let invitationExist = await data.getSentInvites(req.params.email);
    if(invitationExist.length >0)
        res.send("You already sent invite"); 
    else{
        let newInvitation={
            approved: false,
            rejected: false,
            from_user: req.params.email,
            to_user: req.body.to_user,
            to_userEmail: req.body.to_userEmail
        }
        data.createInvitation(newInvitation)
        .then((msg)=>res.json(msg))
        .catch((err)=>res.status(400).json(err));
    }
});
router.get("/:email/invitations", async (req, res) => {
    try {
      //get all invitatitions by user id
      const invitations = await data.getIncomingInvites(req.params.email);
      //send response with invitations
      res.json(invitations);
    } catch (err) {
      res.status(400).json({ error:err });
    }
  });
module.exports = router;