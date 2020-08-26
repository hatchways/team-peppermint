const router = require("express").Router();
const data = require("../data-modules/dataService")();

//contacts route
router.post("/:email/invite", async (req, res) => {
  try {
    //find the user, who sent invitation, by id
    const userData = await data.getUserById(req.body.referrer);
    const pendingInvitationByContactEmail = await data.getInvitationByContactEmail(
      req.params.email,
      userData.email,
      0
    );
    if (
      pendingInvitationByContactEmail !== undefined &&
      "email" in pendingInvitationByContactEmail
    ) {
      res.status(200).json(pendingInvitationByContactEmail);
    }

    const approvedInvitationByContactEmail = await data.getInvitationByContactEmail(
      req.params.email,
      userData.email,
      1
    );

    if (
      approvedInvitationByContactEmail !== undefined &&
      "email" in approvedInvitationByContactEmail
    ) {
      res.status(200).json(approvedInvitationByContactEmail);
    }

    const rejectedContactFoundByContactEmail = await data.getInvitationByContactEmail(
      req.params.email,
      userData.email,
      2
    );

    if (rejectedContactFoundByContactEmail !== undefined) {
      await data.deleteContact(req.params.email, userData.email);
      await data.deleteContact(userData.email, req.params.email);
    }

    !approvedInvitationByContactEmail.email &&
      !pendingInvitationByContactEmail.email &&
      data
        .addContact(req.params.email, userData.email)
        .then(() => {
          res.status(200).json("contact added");
        })
        .catch((err) => {
          res.status(400).json(err);
        });
  } catch (err) {
    res.status(400).send(err.message);
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
  data
    .respondToInvite(req.params.email, req.body.data.contactToApprove, 1)
    .then((msg) => {
      res.status(200).json({ message: msg });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
});
router.post("/:email/reject", (req, res) => {
  data
    .respondToInvite(req.params.email, req.body.data.contactToReject, 2)
    .then((msg) => {
      res.status(200).json({ message: msg });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
});

module.exports = router;
