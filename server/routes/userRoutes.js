// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../model/userData");

// // Login route for both Admin and User
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find user (could be admin or user)
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "Account not found" });
//     }

//     // Check password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "2h" }
//     );

//     res.status(200).json({
//       message: `${user.role} login successful`,
//       token,
//       user: {
//         id: user._id,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;




// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../model/userData");

// // Login route for both Admin and User
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find user by email
//     const account = await User.findOne({ email });
//     if (!account) {
//       return res.status(404).json({ message: "Account not found" });
//     }

//     // Check role
//     if (account.role === "admin") {
//       // Admin: compare plain password
//       if (account.password !== password) {
//         return res.status(400).json({ message: "Invalid admin credentials" });
//       }
//     } else {
//       // User: compare bcrypt hashed password
//       const isMatch = await bcrypt.compare(password, account.password);
//       if (!isMatch) {
//         return res.status(400).json({ message: "Invalid user credentials" });
//       }
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { id: account._id, role: account.role },
//       process.env.JWT_SECRET,
      
//     );

//     res.status(200).json({
//       message: `${account.role} login successful`,
//       token,
//       user: {
//         id: account._id,
//         email: account.email,
//         role: account.role,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const XLSX = require("xlsx");
const nodemailer = require("nodemailer");
const User = require("../model/userData");

// 🔐 Environment setup (dotenv used in server.js)
const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL; // optional

// Email Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

// ✅ 1. Admin Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, gender, city, country } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const adminUser = new User({
      name,
      email,
      password: hashedPassword,
      gender,
      city,
      country,
      role: "admin"
    });

    await adminUser.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Signup failed" });
  }
});

// ✅ 2. Admin Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const account = await User.findOne({ email });
    if (!account) return res.status(404).json({ message: "Account not found" });

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    account.lastLoginAt = new Date();
    await account.save();

    const token = jwt.sign({ id: account._id, role: account.role }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: `${account.role} login successful`,
      token,
      user: { id: account._id, email: account.email, role: account.role },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ 3. Middleware to check admin access
const verifyAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// ✅ 4. Upload Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/excels"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// ✅ 5. Admin Upload Excel to Create Users
router.post("/upload-users", verifyAdmin, upload.single("file"), async (req, res) => {
  try {
    const workbook = XLSX.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const users = XLSX.utils.sheet_to_json(sheet);

    const newUsers = [];

    for (const u of users) {
      const { name, email, gender, city, country } = u;

      if (!email) continue;
      const existing = await User.findOne({ email });
      if (existing) continue;

      const plainPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(plainPassword, 10);

      const user = new User({
        name,
        email,
        password: hashedPassword,
        gender,
        city,
        country,
        role: "user",
      });

      await user.save();
      newUsers.push(user);

      // Send password via email
      await transporter.sendMail({
        from: process.env.SMTP_EMAIL,
        to: email,
        subject: "Your Account Credentials",
        text: `Hi ${name},\n\nYour account has been created.\nEmail: ${email}\nPassword: ${plainPassword}\n\nPlease log in and change your password.`,
      });
    }

    res.json({ message: `${newUsers.length} users created and emailed.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "User import failed" });
  }
});

module.exports = router;
