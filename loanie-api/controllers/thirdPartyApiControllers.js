const User = require("../models/userModels");

const sendEmailNotification = (req, res) => {
	const { name, userType, email, text } = req.body;
	const newUser = new User({
	  name,
	  userType,
	  email,
	  text
	});
	console.log("Request Body:", req.body);

	const sgMail = require('@sendgrid/mail');

	sgMail.setApiKey(process.env.SENDGRID_API_KEY);
	const msg = {
		to: email,
		from: 'baheti.rash123@gmail.com',
		subject: 'Sending with SendGrid is Fun',
		text,
	};
	sgMail.send(msg, function(err, response) {
	    if(err) {
	    	console.log(err);
	    }

	    else {
	        console.log('Yay! Our templated email has been sent');
	        res.json("Email Notification sent!");
	    }
	});
};

module.exports = {
  sendEmailNotification,
}