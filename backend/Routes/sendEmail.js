const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {
  try {
    const transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: `"Himanshu Sharma" <${process.env.EMAIL_USER}>`, // Sender email
      to: req.body.email, // Receiver email
      subject: "Cloth-App-Stay Updated with the Latest Fashion Trends and Exclusive Offers!", // Email subject
      text: process.env.EMAIL_TEXT, // Plain text body
      html: "Hello! This is a test email.", // HTML body
    });

    console.log("Email sent: " + info.messageId);
    res.json({ success:true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ status: "error", message: "Failed to send email" }); // Send error response
  }
});

module.exports = router;