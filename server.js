const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
// Body parser middleware
const app = express();
const PORT = process.env.PORT || 3001;

// Use the cors middleware
app.use(cors());

// Body parser middleware
app.use(bodyParser.json());

// Nodemailer configuration
app.get("/", (req, res) => {
  res.send("Welcome to the Email API!");
});
// Create a transporter object
app.post("/send-email", (req, res) => {
  const { to, subject, text } = req.body;

  // Create a transporter object
  const transporter = nodemailer.createTransport({
    host: "mail.trekhills.com",
    port: 465,
    secure: true, // Use SSL/TLS
    auth: {
      user: "info@trekhills.com",
      pass: "kD(cI_VSgm=x", // Replace with the actual password
    },
  });

  // Email content
  const mailOptions = {
    from: "info@trekhills.com",
    to,
    subject,
    text,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
