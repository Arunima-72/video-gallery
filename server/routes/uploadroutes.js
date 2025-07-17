const express = require("express");
const router = express.Router();
const multer = require("multer");
const xlsx = require("xlsx");
const bcrypt = require("bcryptjs");
const User = require("../model/userData");
const nodemailer = require("nodemailer");

// Multer config
const upload = multer({ dest: "uploads/" });

// Upload route
router.post("/upload-users", upload.single("file"), async (req, res) => {
  try {
    const workbook = xlsx.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const usersData = xlsx.utils.sheet_to_json(sheet);

    for (let user of usersData) {
      const plainPassword = generatePassword(); // generate random password
      const hashedPassword = await bcrypt.hash(plainPassword, 10);

      // Save to DB
      const newUser = new User({
        name: user.name,
        email: user.email,
        password: hashedPassword,
        gender: user.gender,
        city: user.city,
        country: user.country,
        role: "user"
      });

      await newUser.save();

      // Send email to user with password
      await sendEmail(user.email, plainPassword);
    }

    res.status(201).json({ message: "Users created and passwords sent" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload failed" });
  }
});

// Generate random password
function generatePassword(length = 8) {
  return Math.random().toString(36).slice(-length);
}

// Email function using nodemailer
async function sendEmail(to, password) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.ADMIN_EMAIL,
    to,
    subject: "Your Account Password",
    text: `Welcome! Your login password is: ${password}`,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = router;
