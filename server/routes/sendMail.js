const router = require("express").Router();
const data = require("../data-modules/dataService")();
const { sendMail } = require("../data-modules/SendInvitation");

//contacts route
router.post("/:email/sendMail", async (req, res) => {
  console.log("RECEIVED MAIL REQUEST ", req.params.email, req.body.referrer);
  try {
    const sent = await sendMail(req.params.email, req.body.referrer);
    if (sent) {
      res.send({ message: "email sent successfully" });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

module.exports = router;
