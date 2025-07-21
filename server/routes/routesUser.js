//  const express = require("express");
// const router = express.Router();
// const User = require("../model/userData");
//  const jwt = require('jsonwebtoken');
 
 
//  function authenticateUserOnly(req, res, next) {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Authorization token missing" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || "resApp");

//     // Check if the role is user
//     if (decoded.role !== "user") {
//       return res.status(403).json({ message: "Access denied: Users only" });
//     }

//     // Attach user data to the request
//     req.user = {
//       id: decoded.id,
//       email: decoded.email,
//       role: decoded.role,
//     };

//     next();
//   } catch (err) {
//     console.error("JWT verification failed:", err);
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// }

// router.get("/profile", authenticateUserOnly, async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.user.email }).select("-password");
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     console.error("Error fetching profile:", error);
//     res.status(500).json({ message: "Server error fetching profile" });
//   }
// });

// // ✅ PUT: Update logged-in user's profile (Users only)
// router.put("/profile", authenticateUserOnly, async (req, res) => {
//   const { name, gender, city, country } = req.body;

//   try {
//     const updatedUser = await User.findOneAndUpdate(
//       { email: req.user.email },
//       { $set: { name, gender, city, country } },
//       { new: true, runValidators: true }
//     ).select("-password");

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json({
//       message: "Profile updated successfully",
//       user: updatedUser,
//     });
//   } catch (err) {
//     console.error("Error updating profile:", err);
//     res.status(500).json({ message: "Server error updating profile" });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const User = require("../model/userData");
const jwt = require("jsonwebtoken");


function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET );

    // Attach user data and role to the request
    req.user = {
      id: decoded.id,
      role: decoded.role,
      email: decoded.email,
    };
    next();
  } catch (err) {
    console.error("JWT Verification failed:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

router.put("/profile", authenticate, async (req, res) => {
  const { name, gender, city, country } = req.body;

  try {
    // Update user document based on the logged-in email
    const updatedUser = await User.findOneAndUpdate(
      { email: req.user.email }, // find by logged-in user's email
      { $set: { name, gender, city, country } }, // only allow updating these fields
      { new: true, runValidators: true }
    ).select("-password"); // exclude password from response

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Server error while updating profile" });
  }
});

// ✅ GET: Fetch logged-in user's/admin's profile
router.get("/get", authenticate, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: "Server error while fetching profile" });
  }
});

module.exports = router;
