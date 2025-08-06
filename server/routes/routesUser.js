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
const video= require("../model/videoData");
const nodemailer = require("nodemailer");
const Contact = require("../model/contactData");
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
      id: decoded.userId,
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



// Save a video
router.post('/saved/:videoId', authenticate, async (req, res) => {
  const userId = req.user.id;
  const { videoId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!user.savedVideos.includes(videoId)) {
      user.savedVideos.push(videoId);
      await user.save();
    }
    res.status(200).json({ message: 'Video saved' });
  } catch (err) {
    console.error('Save error:', err);
    res.status(500).json({ message: 'Failed to save video' });
  }
});

// Unsave a video
router.delete('/saved/:videoId', authenticate, async (req, res) => {
  const userId = req.user.id;
  const { videoId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.savedVideos = user.savedVideos.filter(
      (vid) => vid.toString() !== videoId
    );
    await user.save();
    res.status(200).json({ message: 'Video unsaved' });
  } catch (err) {
    console.error('Unsave error:', err);
    res.status(500).json({ message: 'Failed to unsave video' });
  }
});

// Get saved videos
router.get('/saved', authenticate, async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId).populate('savedVideos');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user.savedVideos);
  } catch (err) {
    console.error('Fetch saved error:', err);
    res.status(500).json({ message: 'Failed to fetch saved videos' });
  }
});

// Check if video is saved
router.get('/saved/check/:videoId', authenticate, async (req, res) => {
  const userId = req.user.id;
  const { videoId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isSaved = user.savedVideos.includes(videoId);
    res.status(200).json({ saved: isSaved });
  } catch (err) {
    console.error('Check saved error:', err);
    res.status(500).json({ message: 'Failed to check saved status' });
  }
});
// router.post("/contact", async (req, res) => {
//   const { name, email, phone } = req.body;

//   if (!name || !email) {
//     return res.status(400).json({ message: "Name and email are required" });
//   }

//   // Email transporter (Gmail or other SMTP)
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,      // e.g. yourgmail@gmail.com
//       pass: process.env.EMAIL_PASS       // App Password (not your main password!)
//     }
//   });

//   const mailOptions = {
//     from: email,
//     to: process.env.EMAIL_USER, // send to yourself
//     subject: "New Contact Form Submission",
//     text: `
//       Name: ${name}
//       Email: ${email}
//       Phone: ${phone || "Not provided"}
//     `
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log("Contact form email sent:", { name, email, phone });
//     res.status(200).json({ message: "Contact info received and email sent" });
//   } catch (error) {
//     console.error("Email sending failed:", error);
//     res.status(500).json({ message: "Failed to send email" });
//   }
// });
// Express route example
// router.post('/contact', async (req, res) => {
//   const { name, email } = req.body;
//   try {
//     await User.create({ name, email }); // Adjust based on your schema
//     res.status(201).json({ message: 'Contact saved' });
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });
router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    await Contact.create({ name, email, message }); // match your schema
    res.status(201).json({ message: 'Contact saved' });
  } catch (err) {
    console.error("Error saving contact:", err);
    res.status(500).json({ error: 'Server error' });
  }
});
router.get("/contact", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json(contacts);
  } catch (err) {
    console.error("Error fetching contacts:", err);
    res.status(500).json({ error: "Server error" });
  }
});
router.delete("/contact/:id", async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.sendStatus(200);
});
// router.delete("/contact/all", async (req, res) => {
//   await Contact.deleteMany({});
//   res.sendStatus(200);
// });
// router.delete("/save/contact/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     if (id === "all") {
//       await Contact.deleteMany(); // delete all contacts
//       return res.status(200).json({ message: "All contacts deleted" });
//     }

//     // delete a specific contact by ID
//     await Contact.findByIdAndDelete(id);
//     res.status(200).json({ message: "Contact deleted" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// });
// router.delete("/contact/all", async (req, res) => {
//   try {
//     await Contact.deleteMany({});
//     res.sendStatus(200); // OK
//   } catch (error) {
//     console.error("Error deleting all contacts:", error);
//     res.status(500).json({ error: "Failed to delete contacts" });
//   }
// });
// router.delete("/contact/all", async (req, res) => {
//   try {
//     await Contact.deleteMany({});
//     res.status(200).json({ message: "All contacts deleted successfully." });
//   } catch (error) {
//     console.error("Error deleting contacts:", error);
//     res.status(500).json({ message: "Failed to delete contacts." });
//   }
// });
// router.delete("/clear-all",  async (req, res) => {
//   if (req.user.role !== "admin") {
//     return res.status(403).json({ message: "Access denied" });
//   }

//   try {
//     await UserActivity.deleteMany({});
//     res.status(200).json({ message: "All user activities cleared" });
//   } catch (err) {
//     console.error("Error clearing activities:", err);
//     res.status(500).json({ error: err.message });
//   }
// });
router.delete("/all", authenticate, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    await Contact.deleteMany({});
    res.status(200).json({ message: "All contacts deleted" });
  } catch (err) {
    console.error("Error clearing contacts:", err);
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
