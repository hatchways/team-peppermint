const router = require("express").Router();
const data = require('../data-modules/dataService')();

//contacts route
router.post("/:email/invites", async (req, res) => {

    let newInvitation={
        approved: false,
        from_user: req.params.email,
        to_user: req.body.to_user,
        to_userEmail: req.body.to_userEmail
    }
    data.createInvitation(newInvitation)
    .then((msg)=>res.json(msg))
    .catch((err)=>res.status(400).json(err));
  
});

module.exports = router;