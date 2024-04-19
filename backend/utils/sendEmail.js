const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GG_USER,
    pass: process.env.GG_PASSWORD,
  },
});

const sendMail = (data) => {
  transporter.sendMail(
    {
      from: process.env.GG_USER,
      to: data?.to,
      subject: data?.subject,
      text: data?.text,
      html: data?.html,
    },
    function (error, info) {
      if (error) {
        console.log(error);
      }
    }
  );
};

module.exports = sendMail;
