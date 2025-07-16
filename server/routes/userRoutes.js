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




const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/userData");

// Login route for both Admin and User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const account = await User.findOne({ email });
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Check role
    if (account.role === "admin") {
      // Admin: compare plain password
      if (account.password !== password) {
        return res.status(400).json({ message: "Invalid admin credentials" });
      }
    } else {
      // User: compare bcrypt hashed password
      const isMatch = await bcrypt.compare(password, account.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid user credentials" });
      }
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: account._id, role: account.role },
      process.env.JWT_SECRET,
      
    );

    res.status(200).json({
      message: `${account.role} login successful`,
      token,
      user: {
        id: account._id,
        email: account.email,
        role: account.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
