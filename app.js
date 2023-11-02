const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const dotenv =  require('dotenv');
dotenv.config({
    encoding: 'utf8',
    debug: process.env.DEBUG||false,
    override: false,

});

// Set up your Nodemailer transporter
const to = "misganewendeg879@gmail.com";
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.SENDER_EMAIL_USERNAME,
        pass: process.env.SENDER_EMAIL_PASSWORD,
    }
});

// Define a route for sending emails
app.post('/send-email', (req, res) => {
  const mailOptions = {
    from: process.env.SENDER_EMAIL_USERNAME,
    to: 'recipient@example.com',
    subject: 'Your Subject',
    text: 'Your email message goes here.',
    cc: ["yideg.misganew.3090@gmail.com"],
    bcc:["yideg.misganew.3090@gmail.com"],

  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Email not sent');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent');
    }
  });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
