const nodemailer = require("nodemailer");

require("dotenv").config();

const config = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "kateryna.999@meta.ua",
    pass: process.env.PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

const sendEmail = ({ to, subject, text }) => {
  const emailOptions = {
    from: "kateryna.999@meta.ua",
    to,
    subject,
    text,
  };
  return transporter.sendMail(emailOptions).then((info) => {
    console.log("Email to: ", to);
    console.log("Subject: ", subject);
    console.log("Message: ", text);
    console.log("Email sent: ", info.response);
  });
};

module.exports = { sendEmail };
