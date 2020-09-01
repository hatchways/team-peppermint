const router = require("express").Router();
const data = require("../data-modules/dataService")();
const { onlineUsers } = require("../socket/socket-online-users");

const sortByEmail = (a, b) => {
  let emailA = a.email.toLowerCase(); // ignore upper and lowercase
  let emailB = b.email.toLowerCase(); // ignore upper and lowercase
  if (emailA < emailB) {
    return -1;
  }
  if (emailA > emailB) {
    return 1;
  }
  // names must be equal
  return 0;
};

router.get("/:email/contacts", async (req, res) => {
  try {
    //find user's contacts by user email
    const contacts = await data.getContacts(req.params.email);

    // create only contacts emails array
    const contactsEmails = contacts.map((contact) => contact.email);

    // find users by their email
    const usersByEmail = await data.getUsers(contactsEmails);
    const sortUsersByEmail = usersByEmail.sort((a, b) => sortByEmail(a, b));

    // find all contacts with pending status
    const invitationsList = await data.getContactsByStatus(req.params.email, 0);

    // select approved contacts with status === 1
    const approvedContacts = await data.getContactsByStatus(
      req.params.email,
      1
    );

    // create contacts list
    let contactsList = [];

    if (approvedContacts.length) {
      contactsList = approvedContacts
        .sort((a, b) => sortByEmail(a, b))
        .map((contact, index) => {
          const isOnline = Object.keys(onlineUsers).includes(contact.email);
          return {
            email: contact.email,
            name: sortUsersByEmail[index].name,
            pictureUrl: sortUsersByEmail[index].pictureURL,
            conversationID: contact.conversationID,
            language: sortUsersByEmail[index].language,
            isOnline: isOnline,
          };
        });
    }

    //response with contacts and invitations lists
    res.status(200).json({
      invitationsList,
      contactsList,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/:email/search", async (req, res) => {
  try {
    const { query } = req.body;

    //find user's contacts by user email
    const contacts = await data.getContacts(req.params.email);

    // create only contacts emails array
    const contactsEmails = contacts.map((contact) => contact.email);

    // find users by their email
    const usersByEmail = await data.getUsers(contactsEmails);
    const sortUsersByEmail = usersByEmail.sort((a, b) => sortByEmail(a, b));

    // select approved contacts with status === 1
    const approvedContacts = await data.getContactsByStatus(
      req.params.email,
      1
    );

    // create contacts list
    let contactsList = [];

    if (approvedContacts.length) {
      contactsList = approvedContacts
        .sort((a, b) => sortByEmail(a, b))
        .map((contact, index) => {
          const isOnline = Object.keys(onlineUsers).includes(contact.email);
          return {
            email: contact.email,
            name: sortUsersByEmail[index].name,
            pictureUrl: sortUsersByEmail[index].pictureURL,
            conversationID: contact.conversationID,
            language: sortUsersByEmail[index].language,
            isOnline: isOnline,
          };
        });
    }

    const foundContactsList = contactsList.filter(
      (contact) =>
        contact.name.toLowerCase().includes(query.toLowerCase()) ||
        contact.email.toLowerCase().includes(query.toLowerCase())
    );

    //response with contacts and invitations lists
    res.status(200).json({ foundContactsList });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:email/contacts", async (req, res) => {
  Promise.all([
    data.updateContact(req.params.email, req.body.emailToDelete, 2),
    data.updateContact(req.body.emailToDelete, req.params.email, 4)
  ])
  .then((msg) => {
    console.log(msg)
    res.status(200).json({ message: msg });
  })
  .catch((err) => {
    res.status(500).json({ err });
  });
});

router.put("/:email/image", async (req, res) => {
  try {
    //find user's contacts by user email
    const msg = await data.updateUserImage(
      req.params.email,
      req.body.newImageData
    );
    //response with contacts
    res.status(200).json(msg);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
