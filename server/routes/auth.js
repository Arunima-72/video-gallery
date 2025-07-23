// 📂 routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../model/userData");
const nodemailer = require("nodemailer");

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

const JWT_SECRET = process.env.JWT_SECRET; // Use .env in production

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

// router.post("/login", async (req, res) => {
//   const { email, password, role } = req.body;

//   // ✅ Validation
//   if (!email || !password || !role) {
//     return res.status(400).json({ message: "Email, password and role are required" });
//   }

//   if (!["admin", "user"].includes(role)) {
//     return res.status(400).json({ message: "Role must be either 'admin' or 'user'" });
//   }

//   try {
//     // ✅ Find user with specified role
//     const user = await User.findOne({ email, role });
//     if (!user) {
//       return res.status(401).json({ message: "Invalid credentials or role" });
//     }

//     // ✅ Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // ✅ Generate JWT Token
//     const token = jwt.sign(
//       {
//         id: user._id,
//         email: user.email,
//         role: user.role, // important for role-based authorization
//       },
//       JWT_SECRET,
//       { expiresIn: "2h" } // token expiry
//     );

//     res.status(200).json({
//       message: `${role.charAt(0).toUpperCase() + role.slice(1)} logged in successfully`,
//       token, // client should store and use this
//       role: user.role,
//       userId: user._id,
//     });
//   } catch (err) {
//     console.error("Login Error:", err.message);
//     res.status(500).json({ message: "Server error during login" });
//   }
// });


// LOGIN ROUTE                                                       // edited login 18/7
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare entered password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Generate JWT with user's email and role
    const token = jwt.sign(
      { email: user.email, role: user.role },
      JWT_SECRET 
    );

    // Respond with token and user role
    res.status(200).json({
      message: 'Login successful',
      token,
      role: user.role, // frontend can use this to redirect
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
});



/**
 * ✅ Forgot Password (Send Reset Link)
 */
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No user found with this email" });
    }

    // Generate reset token (valid for 15 min)
    const resetToken = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "15m",
    });

    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
      console.log("RESET LINK:", resetLink); 
    await sendResetEmail(user.email, resetLink);

    res.status(200).json({ message: "Reset link sent to your email" });
  } catch (err) {
    console.error("Forgot Password Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * ✅ Reset Password (via Reset Link)
 */
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword, confirmPassword } = req.body;

  if (!newPassword || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    console.error("Reset Password Error:", err);
    if (err.name === "TokenExpiredError") {
      return res.status(400).json({ message: "Reset link expired" });
    }
    res.status(500).json({ message: "Invalid or expired reset token" });
  }
});

/**
 * 📧 Send Reset Email
 */
async function sendResetEmail(to, resetLink) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"Support" <${process.env.ADMIN_EMAIL}>`,
    to,
    subject: "Reset Your Password",
    html: `
      <h3>Password Reset</h3>
      <p>Click below to reset your password:</p>
      <a href="${resetLink}" target="_blank">${resetLink}</a>
      <p>This link is valid for 15 minutes.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}




module.exports=router;