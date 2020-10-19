const stringHash = require("string-hash");

const router = require("express").Router();
const data = require("../data-modules/dataService")();

//contacts route
router.post("/:email/invite", async (req, res) => {
  try {
    //find the user, who sent invitation, by id
    console.log("invite", req.body.contact)
    const contacts = await data.getContacts(req.params.email);
    let contactExists;
    if (contacts)
      contactExists = contacts.find((contact) => contact.email === req.body.contact);
    if (!contactExists) {
      data
        .addContact(req.params.email, req.body.contact)
        .then(() => {
          res.status(200).json("contact added");
        })
        .catch((err) => {
          res.status(400).json({ error: err });
        });
    }
    else {
      res.status(400).json({ message: `invite already sent to ${req.body.contact}` })
    }
  } catch (err) {
    res.status(400).json(err);
  }
});
router.get("/:email/invitations", (req, res) => {
  data
    .getContactsByStatus(req.params.email, 0)
    .then((contacts) => {
      res.status(200).json(contacts);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
router.post("/:email/approve", (req, res) => {
  let users = [req.params.email, req.body.data.contactToApprove];
  console.log('CONTACTS TO APPROVE... ', users)
  let conversationId = users.sort().join()
  Promise.all([
    data.updateContact(req.params.email, req.body.data.contactToApprove, 1, stringHash(conversationId)),
    data.updateContact(req.body.data.contactToApprove, req.params.email, 1, stringHash(conversationId)),
    data.createConversation(users)
  ]).then((results) => {
    console.log(results)
    res.status(200).json({ message: results });
  }, (error) => {
    console.log(error)
    res.status(500).json({ error });
  })
});
router.post("/:email/reject", (req, res) => {
  data
    .updateContact(req.params.email, req.body.data.contactToReject, 2)
    .then((msg) => {
      res.status(200).json({ message: msg });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
});

module.exports = router;
