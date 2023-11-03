const express = require('express');
const nodemailer = require('nodemailer');
const dotenv =  require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config({
    encoding: 'utf8',
    debug: process.env.DEBUG||false,
    override: false,

});
var app = express();

// Set up your Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.SENDER_EMAIL_USERNAME,
        pass: process.env.SENDER_EMAIL_PASSWORD,
    }
});
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define a route for sending emails
app.post('/api/send-email', async(req, res) => {
    const {sender,subject,message,name}= req.body;
  await transporter.sendMail({
    from: process.env.SENDER_EMAIL_USERNAME, // sender address
    to: process.env.RECEIVER_EMAIL, // list of receivers
    subject: subject, // Subject line
    text: `New user ${name}[email:${sender}] has sent you new message \n${message}`, // plain text body
  }, async(error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Email not sent');
    } else {
        await transporter.sendMail({
            from: process.env.SENDER_EMAIL_USERNAME,
            to: sender, 
            subject: `New Message`, // Subject line
            text: `
                Dear ${name},\n
                Thank you for getting in touch with me. I will review your mail and will provide a thoughtful response shortly.\n
                Warm regards,\n
                Yideg Misganaw
            `, 
          },)

      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent');
    }
  });
});

app.listen( process.env.PORT || 3000, () => {
  console.log('Server is running');
});
