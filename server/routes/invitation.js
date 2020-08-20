const router = require("express").Router();
const data = require('../data-modules/dataService')();

//contacts route
router.post("/:email/invite", async (req, res) => {
    data.addContact(req.params.email, req.body.newContact)
    .then(()=>{res.status(200).json("contact added")})
    .catch((err)=>{res.status(400).json(err)})
});
router.get("/:email/invitations", async (req, res) => {
    data.getContactsByStatus(req.params.email, 0)
    .then((contacts)=>{ res.status(200).json(contacts)})
    .catch((err)=>{res.status(400).json(err)})
  });
module.exports = router;