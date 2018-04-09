const User = require("../models/userModels");
const sgMail = require("@sendgrid/mail");

const sendEmailNotification = (req, res) => {
  const { name, email, text } = req.body;
  const newUser = new User({
    name,
    email,
    text,
  });
  console.log("Request Body:", req.body);

  const sgMail = require('@sendgrid/mail');
  const sendgrid_key = process.env.SENDGRID_API_KEY || "default_sendgrid_key";
  sgMail.setApiKey(sendgrid_key);
  const msg = {
    to: email,
    from: process.env.SENDGRID_EMAIL_FROM,
    subject: 'Sending with SendGrid is Fun',
    text,
  };
  sgMail.send(msg, (err, response) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Yay! Our templated email has been sent');
      res.json("Email notification sent!");
    }
  });
};

const sendNewLoanEmail = (req, res) => {
  console.log("send new loan email");
  const name = "Valued Client";
  const link = "https://loanie.herokuapp.com/";
  const {
    managerName, managerEmail, phoneNumber, clientEmail,
  } = req.body;
  const text = `Hi ${name}! Your loan officer, ${managerName}, would like to cordially invite you to use a new cutting edge mortgage communication tool called Loanie! Your loan information is waiting for you, all you have to do is sign up at ${link} . If you have any trouble or questions you can contact ${managerName} by phone at ${phoneNumber} or by email at ${managerEmail} .`;

  console.log("Request Body:", req.body);

  const sendgridKey = process.env.SENDGRID_API_KEY || "default_sendgrid_key";
  sgMail.setApiKey(sendgridKey);
  const msg = {
    to: clientEmail,
    from: process.env.SENDGRID_EMAIL_FROM,
    subject: "Your loan process has begun!",
    text,
  };
  sgMail.send(msg, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent successfully!");
      res.json("Email notification sent!");
    }
  });
};

const sendSmsNotification = (req, res) => {
  const { name, mobilePhone, text } = req.body;
  const newUser = new User({
    name,
    mobilePhone,
    text,
  });
  console.log("Request Body:", req.body);

  const accountSid = process.env.TWILIO_ACCOUNT_SID || "default_twilio_sid"; // Your Account SID from www.twilio.com/console
  const authToken = process.env.TWILIO_AUTH_TOKEN || "default_twilio_authToken"; // Your Auth Token from www.twilio.com/console
  const twilio = require("twilio");
  const client = new twilio(accountSid, authToken);

  client.messages
    .create({
      body: text,
      to: mobilePhone, // Text this number
      from: process.env.TWILIO_PHONE_NUMBER // From a valid Twilio number
    })
    .then((message) => {
      console.log(message.sid);
      res.json("SMS notification sent!");
    })
    .catch(err => console.log(err));
};

module.exports = {
  sendEmailNotification,
  sendSmsNotification,
  sendNewLoanEmail,
};
