const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
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
mongoose
  .connect(
    "mongodb+srv://arrehman0r:afsd1423@cluster0.afv3ytm.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });
const Product = require("./models/product");

const Product = mongoose.model("Product", productSchema);
app.post("/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
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
