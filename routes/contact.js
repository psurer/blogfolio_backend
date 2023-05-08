const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Handles POST requests to the contact form
router.post('/contact', (req, res) => { // Sets up a route for handling HTTP POST requests to the /contact URL
  const { name, email, message } = req.body;  // Destructures the request body to extract name, email and message

  // Creates a nodemailer transport object using the createTransport method
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Specifies the email service provider
    auth: {
      user: 'myEmailUserName@gmail.com', // // Specifies the email account credentials
      pass: 'myEmailPassword'
    }
  });

  // Sets up the email message object
  const mailOptions = {
    from: 'userName@gmail.com', // Specifies the email sender address : ? 
    to: 'myEmailUserName@example.com',  // Sets the email recipient address
    subject: 'New contact form submission from ' + name, // Specifies the email subject line
    text: 'Name: ' + name + '\nEmail: ' + email + '\nMessage: ' + message // Specifies the email body text
  };

  // Sends the email message using the sendMail method of the nodemailer transport object
  transporter.sendMail(mailOptions, function(error, info){
    if (error) { // Checks if there is an error in sending the email
      console.log(error); // Logs the error to the console
      res.status(500).send('Error sending message'); // Sends an HTTP 500 error response to the client
    } else { // This line executes IF the email was sent successfully
      console.log('Email sent: ' + info.response); // Logs the response from the email service provider to the console
      res.status(200).send('Message sent successfully'); // Sends an HTTP 200 success response to the client
    }
  });
});

module.exports = router;
// Exports the router object for use in other files
