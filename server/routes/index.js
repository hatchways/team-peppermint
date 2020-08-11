const express = require("express");
const router = express.Router();
const invitation = require('../data-modules/SendInvitation');


const sgMail = require('@sendgrid/mail');

router.get("/welcome", function (req, res, next) { 
  //invitation.sendInvite("olzhas828@gmail.com").then(()=>{
    sgMail.setApiKey(process.env.sg_api);


    const msg = {
      to: 'pepperminthw@gmail.com',
      from: 'pepperminthw@gmail.com',
      subject: 'Sending with Twilio SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail.send(msg).catch((err)=>console.error(err));;
    res.status(200).send({ welcomeMessage: "Step 1 (completed)" }); 
  //}).catch((err)=>{console.error(err)});
});
module.exports = router;
