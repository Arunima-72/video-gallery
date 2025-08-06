// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const xlsx = require("xlsx");
// const bcrypt = require("bcryptjs");
// const User = require("../model/userData");
// const nodemailer = require("nodemailer");

// // Multer config
// const upload = multer({ dest: "uploads/" });

// // Upload route
// router.post("/upload-users", upload.single("file"), async (req, res) => {
//   try {
//     const workbook = xlsx.readFile(req.file.path);
//     const sheet = workbook.Sheets[workbook.SheetNames[0]];
//     const usersData = xlsx.utils.sheet_to_json(sheet);

//     for (let user of usersData) {
//       const plainPassword = generatePassword(); // generate random password
//       const hashedPassword = await bcrypt.hash(plainPassword, 10);

//       // Save to DB
//       const newUser = new User({
//         name: user.name,
//         email: user.email,
//         password: hashedPassword,
//         gender: user.gender,
//         city: user.city,
//         country: user.country,
//         role: "user"
//       });

//       await newUser.save();

//       // Send email to user with password
//       await sendEmail(user.email, plainPassword);
//     }

//     res.status(201).json({ message: "Users created and passwords sent" });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Upload failed" });
//   }
// });

// // Generate random password
// function generatePassword(length = 8) {
//   return Math.random().toString(36).slice(-length);
// }

// // Email function using nodemailer
// async function sendEmail(to, password) {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.ADMIN_EMAIL,
//       pass: process.env.ADMIN_EMAIL_PASSWORD,
//     },
//   });

//   const mailOptions = {
//     from: process.env.ADMIN_EMAIL,
//     to,
//     subject: "Your Account Password",
//     text: `Welcome! Your login password is: ${password}`,
//   };

//   await transporter.sendMail(mailOptions);
// }

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const xlsx = require("xlsx");
// const bcrypt = require("bcryptjs");
// const User = require("../model/userData");
// const nodemailer = require("nodemailer");

// // Multer config
// const upload = multer({ dest: "uploads/" });

// // POST /upload-users route
// router.post("/upload-users", upload.single("file"), async (req, res) => {
//   try {
//     // Read Excel file
//     const workbook = xlsx.readFile(req.file.path);
//     const sheet = workbook.Sheets[workbook.SheetNames[0]];
//     const usersData = xlsx.utils.sheet_to_json(sheet);

//     let createdUsers = [];
//     let skippedUsers = [];

//     for (let user of usersData) {
//       try {
//         // Check if user already exists
//         const existingUser = await User.findOne({ email: user.email });
//         if (existingUser) {
//           skippedUsers.push(user.email); // Track skipped emails
//           continue; // Skip this user
//         }

//         // Generate and hash password
//         const plainPassword = generatePassword(); // random password
//         const hashedPassword = await bcrypt.hash(plainPassword, 10);

//         // Save to DB
//         const newUser = new User({
//           name: user.name,
//           email: user.email,
//           password: hashedPassword,
//           gender: user.gender,
//           city: user.city,
//           country: user.country,
//           role: "user"
//         });

//         await newUser.save();

//         // Send email to user with their password
//         await sendEmail(user.email, plainPassword);

//         createdUsers.push(user.email); // Track successfully created users

//       } catch (innerError) {
//         console.error(`Error processing user ${user.email}:`, innerError);
//         skippedUsers.push(user.email);
//       }
//     }

//     res.status(201).json({
//       message: "Upload completed",
//       created: createdUsers,
//       skipped: skippedUsers,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Upload failed" });
//   }
// });

// // Generate random password
// function generatePassword(length = 8) {
//   const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$!";
//   let password = "";
//   for (let i = 0; i < length; i++) {
//     password += chars.charAt(Math.floor(Math.random() * chars.length));
//   }
//   return password;
// }

// // Email function using nodemailer
// async function sendEmail(to, password) {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.ADMIN_EMAIL,
//       pass: process.env.ADMIN_EMAIL_PASSWORD,
//     },
//   });

//   const mailOptions = {
//     from: `"Admin" <${process.env.ADMIN_EMAIL}>`,
//     to,
//     subject: "Your Account Password",
//     text: `Welcome to Video Gallery! Your login password is: ${password}`,
//   };

//   await transporter.sendMail(mailOptions);
// }

// module.exports = router;


const express = require("express");
const router = express.Router();
const multer = require("multer");
const xlsx = require("xlsx");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/userData");
const nodemailer = require("nodemailer");

const JWT_SECRET = process.env.JWT_SECRET ; // fallback for development

// Multer config
const upload = multer({ dest: "uploads/" });

/**
 * ✅ Middleware: Authenticate admin with JWT token
 */
function authenticateAdmin(req, res, next) {
  const authHeader = req.headers.authorization;

  // Check if Authorization header is present
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    req.admin = decoded; // Attach admin data to request
    next();
  } catch (err) {
    console.error("JWT Verification failed:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

/**
 * ✅ POST /upload-users (Protected Route)
 */
router.post(
  "/upload-users",
  authenticateAdmin, // 👈 Only admins with valid token can access
  upload.single("file"),
  async (req, res) => {
    try {
      // Read Excel file
      const workbook = xlsx.readFile(req.file.path);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const usersData = xlsx.utils.sheet_to_json(sheet);

      let createdUsers = [];
      let skippedUsers = [];

      for (let user of usersData) {
        try {
          // Check if user already exists
          const existingUser = await User.findOne({ email: user.email });
          if (existingUser) {
            skippedUsers.push(user.email); // Track skipped emails
            continue; // Skip this user
          }

          // Generate and hash password
          const plainPassword = generatePassword();
          const hashedPassword = await bcrypt.hash(plainPassword, 10);

          // Save to DB
          const newUser = new User({
            name: user.name,
            email: user.email,
            password: hashedPassword,
            gender: user.gender,
            city: user.city,
            country: user.country,
            role: "user",
          });

          await newUser.save();

          // Send email to user with their password
          await sendEmail(user.email, plainPassword);

          createdUsers.push(user.email); // Track successfully created users
        } catch (innerError) {
          console.error(`Error processing user ${user.email}:`, innerError);
          skippedUsers.push(user.email);
        }
      }

      res.status(201).json({
        message: "Upload completed",
        created: createdUsers,
        skipped: skippedUsers,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Upload failed" });
    }
  }
);

/**
 * ✅ Generate random password
 */
function generatePassword(length = 6) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$!";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

/**
 * ✅ Email function using nodemailer
 */
async function sendEmail(to, password) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"Admin" <${process.env.ADMIN_EMAIL}>`,
    to,
    subject: "Your Account Password",
    text: `Welcome to Video Gallery! Your login password is: ${password}`,
  };

  await transporter.sendMail(mailOptions);
}



/**
 * ✅ GET /get-users (Protected Route)      //updated on 2025-07-20 fetch all users
 */
router.get('/get-users', authenticateAdmin, async (req, res) => {
  try {
    // const users = await User.find({role:'user'}, 'name email '); // Only needed fields
    const users = await User.find({ role: 'user' }, 'name email isActive');

    res.json({ users });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

router.delete('/deleteuser/:userId',  async (req, res) => {
  const { userId } = req.params;

  try {
    const deleted = await User.findByIdAndDelete(userId);
    if (!deleted) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ message: 'Failed to delete user' });
  }
});
router.delete('/clear-all-users', authenticateAdmin, async (req, res) => {
  try {
    await User.deleteMany({ role: 'user' });
    res.status(200).json({ message: 'All users deleted successfully' });
  } catch (err) {
    console.error('Clear all users error:', err);
    res.status(500).json({ message: 'Failed to delete all users' });
  }
});

// router.put('/toggle-status/:userId', authenticateAdmin, async (req, res) => {
//   const { userId } = req.params;
//   const { isActive } = req.body;

//   try {
//     const user = await User.findByIdAndUpdate(userId, { isActive }, { new: true });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     res.status(200).json({ message: `User status updated to ${isActive ? 'Active' : 'Inactive'}` });
//   } catch (error) {
//     console.error('Toggle status error:', error);
//     res.status(500).json({ message: 'Failed to update user status' });
//   }
// });
// Toggle user active status
router.put('/toggle-status/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { isActive: req.body.isActive }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'Status updated', user });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update status' });
  }
});

module.exports = router;
