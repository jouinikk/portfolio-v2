const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (if needed)
app.use(express.static('public'));

// POST route for form submission
app.post('/send-email', (req, res) => {
  const { contactName, contactEmail, contactSubject, contactMessage } = req.body;

  // Create a transporter using your email service's SMTP settings
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email configuration
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'jouinikk1@gmail.com',
    subject: contactSubject || 'Contact Form Submission',
    text: `Name: ${contactName}\nEmail: ${contactEmail}\n\n${contactMessage}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('OK');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
