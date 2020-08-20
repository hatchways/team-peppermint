const router = require("express").Router();
const data = require('../data-modules/dataService')();

//contacts route
router.post("/:email/invite", (req, res) => {
  data.addContact(req.params.email, req.body.newContact)
    .then(() => { res.status(200).json("contact added") })
    .catch((err) => { res.status(400).json(err) })
});
router.get("/:email/invitations", (req, res) => {
  data.getContactsByStatus(req.params.email, 0)
    .then((contacts) => { res.status(200).json(contacts) })
    .catch((err) => { res.status(400).json(err) })
});
router.post('/:email/aprove', (req, res) => {
  data.respondToInvite(req.params.email, req.body.contactToAprove, 1)
    .then((msg) => { res.status(200).json({ message: msg }) })
    .catch((err) => { res.status(500).json({ err }) })
})
router.post('/:email/reject', (req, res) => {
  data.respondToInvite(req.params.email, req.body.contactToReject, 2)
    .then((msg) => { res.status(200).json({ message: msg }) })
    .catch((err) => { res.status(500).json({ err }) })
})
router.post('/:email/deletecontact', (req, res) => {
  data.deleteContact(req.params.email, req.body.contactToDelete)
    .then((msg) => res.status(200).json({ message: msg }))
    .catch((err) => res.status(400).json(err))
})
module.exports = router;