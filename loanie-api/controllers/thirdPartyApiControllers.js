const User = require("../models/userModels");

const sendEmailNotification = (req, res) => {
<<<<<<< HEAD
	const { name, email, text } = req.body;
	const newUser = new User({
	  name,
	  email,
	  text
	});
	console.log("Request Body:", req.body);

	const sgMail = require('@sendgrid/mail');

	sgMail.setApiKey(process.env.SENDGRID_API_KEY);
	const msg = {
		to: email,
		from: 'loaniecs4@gmail.com',
		subject: 'Sending with SendGrid is Fun',
		text,
	};
	sgMail.send(msg, function(err, response) {
	    if(err) {
	    	console.log(err);
	    }

	    else {
	        console.log('Yay! Our templated email has been sent');
	        res.json("Email notification sent!");
	    }
=======
  const { name, email, text } = req.body;
  const newUser = new User({
    name,
    email,
    text,
  });
  console.log("Request Body:", req.body);

  const sgMail = require("@sendgrid/mail");

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: email,
    from: "baheti.rash123@gmail.com",
    subject: "Sending with SendGrid is Fun",
    text,
  };
  sgMail.send(msg, function(err, response) {
    if(err) {
    console.log(err);
    } else {
      console.log('Yay! Our templated email has been sent');
      res.json("Email notification sent!");
		}
>>>>>>> a09f614c301423e2cb10634a140e7e42d42972f6
	});
};

const sendSmsNotification = (req, res) => {
<<<<<<< HEAD
	const { name, mobilePhone, text } = req.body;
	const newUser = new User({
	  name,
	  mobilePhone,
	  text
	});
	console.log("Request Body:", req.body);

	const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
	const authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console
	const twilio = require('twilio');
	const client = new twilio(accountSid, authToken);

	client.messages.create({
	    body: text,
	    to: mobilePhone,  // Text this number
	    from: '+18315349385' // From a valid Twilio number
	})
	.then((message) => {
		console.log(message.sid);
		res.json("SMS notification sent!");
	})
	.catch(err => console.log(err));
=======
  const { name, mobilePhone, text } = req.body;
  const newUser = new User({
    name,
    mobilePhone,
    text,
  });
  console.log("Request Body:", req.body);

  const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
  const authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console
  const twilio = require('twilio');
  const client = new twilio(accountSid, authToken);

  client.messages.create({
    body: text,
    to: mobilePhone, // Text this number
    from: "+16504828839", // From a valid Twilio number
  })
    .then((message) => {
      console.log(message.sid);
      res.json("SMS notification sent!");
    })
    .catch(err => console.log(err));
>>>>>>> a09f614c301423e2cb10634a140e7e42d42972f6
};

module.exports = {
  sendEmailNotification,
  sendSmsNotification,
};
