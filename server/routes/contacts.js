const router = require("express").Router();
const data = require("../data-modules/dataService")();

router.get("/:email/contacts", async (req, res) => {
  try {
    //find user's contacts by user email
    const contacts = await data.getContacts(req.params.email);

    // create only contacts emails array
    const contactsEmails = contacts.map((contact) => contact.email);

    // find users by their email
    const usersByEmail = await data.getUsers(contactsEmails);

    // find all contacts with pending status
    const invitationsList = contacts.filter((contact) => contact.status === 0);

    // select approved contacts with status === 1
    const approvedContacts = contacts.filter((contact) => contact.status === 1);

    // create contacts list
    let contactsList = [];

    if (approvedContacts.length) {
      contactsList = approvedContacts.map((contact, index) => {
        return {
          email: contact.email,
          name: usersByEmail[index].name,
          pictureUrl: usersByEmail[index].pictureURL,
        };
      });
    }

    //response with contacts and invitations lists
    res.status(200).json({ invitationsList, contactsList });
  } catch (err) {
    console.log("ERROR FETCHING CONTACTS ", err.message);
    res.status(400).json(err);
  }
});

router.delete("/:email/contacts", async (req, res) => {
  try {
    //find user's contacts by user email
    const contacts = await data.deleteContact(
      req.body.userEmail,
      req.params.email
    );
    //response with contacts
    res.status(200).json(contacts);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:email/image", async (req, res) => {
  try {
    //find user's contacts by user email
    const msg = await data.updateUserImage(
      req.params.email,
      req.body.data.newImageUrl
    );
    //response with contacts
    res.status(200).json(msg);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
