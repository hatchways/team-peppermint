const MailGen = require("mailgen");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SG_API_KEY);

const sendMail = (receiver) => {
  const mailGenerator = new MailGen({
    theme: "salted",
    product: {
      name: "Peppermint app",
      link: "http://localhost:3000/",
    },
  });

  const email = {
    body: {
      name: receiver,
      intro: "Chat with people from different countries",
      action: {
        instructions: "Please click the button below to create an account",
        button: {
          color: "#33b5e5",
          text: "Create an account",
          link: `http://localhost:3000/signup`,
        },
      },
    },
  };

  const emailTemplate = mailGenerator.generate(email);
  require("fs").writeFileSync("preview.html", emailTemplate, "utf8");

  let msg = {
    to: receiver,
    from: "lee1975uz@gmail.com",
    subject: "Join to the Peppermint app",
    // text: "Chat with people from different countries",
    html: emailTemplate,
  };
  return sgMail
    .send(msg)
    .then((res) => res)
    .catch((err) => err);
};
module.exports.sendMail = sendMail;
