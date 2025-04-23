const nodemailer = require("nodemailer");
require('dotenv').config()
const mail = async(to)=>{


// Create reusable transporter object
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,       // your Gmail address
    pass: process.env.EMAILPASSWORD,          // use App Password, not your real password
  },
});

// Mail options
const mailOptions = {
  from: process.env.EMAIL,
  to: to,         // receiver
  subject: "Hello from Nodemailer",
  text: "This is a test email sent from Nodemailer using Gmail.",
  html: "<b>This is a test email sent from <i>Nodemailer</i> using Gmail.</b>",
};

// Send email
transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    return console.log("Error sending email:", err);
  }
  console.log("Email sent:", info.response);
});


}


mail("azimkarimrahim@gmail.com")

module.exports = mail