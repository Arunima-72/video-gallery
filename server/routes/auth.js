// 📂 routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../model/userData");

// ✅ Admin Signup Route
router.post("/admin/signup", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Validation
  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email, role: "admin" });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save admin user
    const newAdmin = new User({
      name,
      email,
      password: hashedPassword,
      role: "admin", // Force role as admin
    });

    await newAdmin.save();

    res.status(201).json({
      message: "Admin registered successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during signup" });
  }
});



// const JWT_SECRET = 'resApp'; // use a stronger secret in production

// 📂 routes/adminRoutes.js
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "resApp"; // Use .env in production

// ✅ Admin Login Route
// router.post("/admin/login", async (req, res) => {
//   const { email, password } = req.body;

//   // Validation
//   if (!email || !password) {
//     return res.status(400).json({ message: "Email and password are required" });
//   }

//   try {
//     // Find admin user
//     const admin = await User.findOne({ email, role: "admin" });
//     if (!admin) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // Compare password
//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // Generate JWT Token
//     const token = jwt.sign(
//       {
//         id: admin._id,
//         email: admin.email,
//         role: admin.role,
//       },
//       JWT_SECRET,
      
//     );

//     res.status(200).json({
//       message: "Admin logged in successfully",
//       token, // Send the token for client to use
//       role: admin.role,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error during login" });
//   }
// });

router.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  // ✅ Validation
  if (!email || !password || !role) {
    return res.status(400).json({ message: "Email, password and role are required" });
  }

  if (!["admin", "user"].includes(role)) {
    return res.status(400).json({ message: "Role must be either 'admin' or 'user'" });
  }

  try {
    // ✅ Find user with specified role
    const user = await User.findOne({ email, role });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials or role" });
    }

    // ✅ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ Generate JWT Token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role, // important for role-based authorization
      },
      JWT_SECRET,
      { expiresIn: "2h" } // token expiry
    );

    res.status(200).json({
      message: `${role.charAt(0).toUpperCase() + role.slice(1)} logged in successfully`,
      token, // client should store and use this
      role: user.role,
      userId: user._id,
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ message: "Server error during login" });
  }
});




module.exports=router;