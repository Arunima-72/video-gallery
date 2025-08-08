




const express = require("express");  // aug 2 2025 updated code for  change password
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/userData");

 
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Attach user data to request (use userId to match login)
    req.user = {
      userId: decoded.userId,
      role: decoded.role,
      email: decoded.email,
    };
    next();
  } catch (err) {
    console.error("JWT Verification failed:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

/**
 * ✅ Change Password Route (for both user and admin)
 */
router.put("/change-password", authenticate, async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  // ✅ Validate inputs
  if (!currentPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "New passwords do not match" });
  }

  try {
    // ✅ Find the user/admin from token
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "User/Admin not found" });
    }

    // ✅ Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    // ✅ Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // ✅ Update password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      message: `${req.user.role === "admin" ? "Admin" : "User"} password changed successfully`,
    });
  } catch (err) {
    console.error("Change Password Error:", err);
    res.status(500).json({ message: "Server error while changing password" });
  }
});

module.exports = router;














