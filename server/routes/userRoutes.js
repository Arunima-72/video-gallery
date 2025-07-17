



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


const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/userData');

const JWT_SECRET = 'resApp'; // use a stronger secret in production

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// ADMIN SIGNUP (bcrypt hashing)
router.post('/admin/signup', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // ✅ Validate fields
  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).send({ message: 'All fields are required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).send({ message: 'Passwords do not match' });
  }

  try {
    // ✅ Check if Admin already exists
    const existingAdmin = await User.findOne({ email, role: 'admin' });
    if (existingAdmin) {
      return res.status(400).send({ message: 'Admin already exists' });
    }

    // ✅ Hash password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ✅ Create new Admin
    const newAdmin = new User({
      name,
      email,
      password: hashedPassword,
      role: 'admin', // Force role to 'admin'
    });

    await newAdmin.save();

    // ✅ Create JWT token
    const token = jwt.sign(
      { id: newAdmin._id, email: newAdmin.email, role: newAdmin.role },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(201).send({
      message: 'Admin registered successfully',
      token,
      role: newAdmin.role,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Server error during admin signup' });
  }
});


// const JWT_SECRET = 'resApp'; // use a stronger secret in production

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// ✅ ADMIN LOGIN
router.post('/admin/login', async (req, res) => {
  const { email, password } = req.body;

  // ✅ Validate fields
  if (!email || !password) {
    return res.status(400).send({ message: 'Email and password are required' });
  }

  try {
    // ✅ Find admin by email and role
    const admin = await User.findOne({ email, role: 'admin' });
    if (!admin) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }

    // ✅ Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }

    // ✅ Generate JWT token
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(200).send({
      message: 'Admin logged in successfully',
      token,
      role: admin.role,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Server error during admin login' });
  }
});



module.exports = router;
