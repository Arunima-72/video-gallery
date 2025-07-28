const express = require("express");

const multer = require("multer");

const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../model/userData");
const Category = require("../model/categoryData");
const SubCategory = require("../model/subcatData");
const Stack = require("../model/stackData");
const Video = require("../model/videoData");
const fs = require("fs");
const path = require("path");
const upload = multer({ dest: "uploads/" }); // or your custom storage config

// ------------------ Middleware (Inline) ------------------
const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access Denied: No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: "Forbidden: Admin access only" });
    }

    req.adminId = decoded.id; // attach admin ID to request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// ------------------ Multer Setup ------------------

// Image Upload
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

// Video Upload
const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});


// 📄 PDF Upload
const pdfStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const uploadPdf = multer({
  storage: pdfStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF format allowed!'), false);
    }
    cb(null, true);
  }
});

const uploadImage = multer({ storage: imageStorage });

const uploadVideo = multer({
  storage: videoStorage,
  limits: { fileSize: 5 * 1024 * 1024 * 1024 }, // 5GB limit
  fileFilter: (req, file, cb) => {
    const isMP4 = file.mimetype === 'video/mp4';
    if (!isMP4) {
      return cb(new Error('Only MP4 format allowed!'), false);
    }
    cb(null, true);
  }
});
const uploadFiles = multer({ storage: videoStorage }).fields([
  { name: 'file', maxCount: 1 },        // Video
  { name: 'overviewPdf', maxCount: 1 }  // PDF
]);

// ------------------ Stack Routes ------------------
router.post('/stack', authenticateAdmin, uploadImage.single('image'), async (req, res) => {
  try {
    const { name, description } = req.body;
    const image = req.file ? req.file.filename : null;

    const stack = new Stack({ name, description, image });
    await stack.save();
    res.status(201).json(stack);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/stack/:id', authenticateAdmin, async (req, res) => {
  try {
    await Stack.findByIdAndDelete(req.params.id);
    res.json({ message: 'Stack deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// router.put('/edit/stack/:id', authenticateAdmin, async (req, res) => {
//   try {
//     const { name, image } = req.body; // Get updated fields from request body

//     const updatedStack = await Stack.findByIdAndUpdate(
//       req.params.id,
//       { name, image }, // Update fields
//       { new: true, runValidators: true } // Return the updated document
//     );

//     if (!updatedStack) {
//       return res.status(404).json({ message: 'Stack not found' });
//     }

//     res.json({ message: 'Stack updated', stack: updatedStack });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });





router.put(
  '/edit/stack/:id',
  authenticateAdmin,
  upload.single("image"), // Handle single image upload
  async (req, res) => {
    try {
      const { name } = req.body; // Text field

      const updateData = { name };

      // If a new image is uploaded, update the image field too
      if (req.file) {
        updateData.image = req.file.filename;
      }

      const updatedStack = await Stack.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true } // Return updated document
      );

      if (!updatedStack) {
        return res.status(404).json({ message: "Stack not found" });
      }

      res.json({ message: "Stack updated", stack: updatedStack });
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message });
    }
  }
);



// ------------------ Category Routes ------------------
// router.post('/category', authenticateAdmin, async (req, res) => {
//   try {
//     const { name, stack } = req.body;
//     const category = new Category({ name, stack });
//     await category.save();
//     res.status(201).json(category);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });
router.post('/category', authenticateAdmin, uploadImage.single('image'), async (req, res) => {
  try {
    const { name, stack } = req.body;

    if (!name || !stack) {
      return res.status(400).json({ error: "Name and stack are required" });
    }

    const category = new Category({
      name,
      stack,
      image: req.file ? req.file.filename : undefined
    });

    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.delete('/category/:id', authenticateAdmin, async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.put(
  '/edit/category/:id',
  authenticateAdmin,
  upload.single("image"),
  async (req, res) => {
    try {
      const { name } = req.body;
      const updateData = { name };

      if (req.file) {
        updateData.image = req.file.filename;
      }

      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true }
      );

      if (!updatedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }

      res.json({ message: "Category updated", category: updatedCategory });
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message });
    }
  }
);




// ------------------ SubCategory Routes ------------------
// router.post('/sub-category', authenticateAdmin, async (req, res) => {
//   try {
//     const { name, category } = req.body;
//     const subCategory = new SubCategory({ name, category });
//     await subCategory.save();
//     res.status(201).json(subCategory);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });
router.post('/sub-category', authenticateAdmin, uploadImage.single('image'), async (req, res) => {
  try {
    const { name, category } = req.body;

    if (!name || !category) {
      return res.status(400).json({ error: "Name and category are required" });
    }

    const subCategory = new SubCategory({
      name,
      category,
      image: req.file ? req.file.filename : undefined
    });

    await subCategory.save();
    res.status(201).json(subCategory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.delete('/sub-category/:id', authenticateAdmin, async (req, res) => {
  try {
    await SubCategory.findByIdAndDelete(req.params.id);
    res.json({ message: 'SubCategory deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put(
  '/edit/sub-category/:id',
  authenticateAdmin,
  upload.single("image"),
  async (req, res) => {
    try {
      const { name } = req.body;
      const updateData = { name };

      if (req.file) {
        updateData.image = req.file.filename;
      }

      const updatedSubCategory = await SubCategory.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true }
      );

      if (!updatedSubCategory) {
        return res.status(404).json({ message: "Sub-category not found" });
      }

      res.json({
        message: "Sub-category updated",
        subCategory: updatedSubCategory,
      });
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message });
    }
  }
);



// ------------------ Video Routes ------------------
router.post('/video', authenticateAdmin, uploadFiles, async (req, res) => {
  try {
    const { title, description, stack, category, subCategory } = req.body;
    const videoFile = req.files['file']?.[0];
    const pdfFile = req.files['overviewPdf']?.[0];

    if (!videoFile) return res.status(400).json({ error: 'Video file is required' });

    const video = new Video({
      title,
      description,
      fileUrl: videoFile.path,
      fileType: videoFile.mimetype,
      fileSize: videoFile.size,
      uploadedBy: req.adminId,
      stack,
      category,
      subCategory,
      overviewPdf: pdfFile ? pdfFile.path : null
    });

    await video.save();
    res.status(201).json(video);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// router.post('/video', authenticateAdmin, uploadVideo.single('file'), async (req, res) => {
//   try {
//     const { title, description, stack, category, subCategory } = req.body;
//     const file = req.file;

//     const video = new Video({
//       title,
//       description,
//       fileUrl: file.path,
//       fileType: file.mimetype,
//       fileSize: file.size,
//       uploadedBy: req.adminId,
//       stack,
//       category,
//       subCategory
//     });

//     await video.save();
//     res.status(201).json(video);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });
router.put('/video/:id', authenticateAdmin, uploadFiles, async (req, res) => {
  try {
    const { title, description, stack, category, subCategory } = req.body;
    const videoFile = req.files['file']?.[0];
    const pdfFile = req.files['overviewPdf']?.[0];

    const updateData = {
      title,
      description,
      stack,
      category,
      subCategory
    };

    if (videoFile) {
      updateData.fileUrl = videoFile.path;
      updateData.fileType = videoFile.mimetype;
      updateData.fileSize = videoFile.size;
    }

    if (pdfFile) {
      updateData.overviewPdf = pdfFile.path;
    }

    const updated = await Video.findByIdAndUpdate(req.params.id, updateData, { new: true });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// router.put('/video/:id', authenticateAdmin, async (req, res) => {
//   try {
//     const { title, description, stack, category, subCategory } = req.body;

//     const updated = await Video.findByIdAndUpdate(req.params.id, {
//       title, description, stack, category, subCategory
//     }, { new: true });

//     res.json(updated);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

router.delete('/video/:id', authenticateAdmin, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    if (fs.existsSync(video.fileUrl)) fs.unlinkSync(video.fileUrl);

    await Video.findByIdAndDelete(req.params.id);
    res.json({ message: 'Video deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.get('/videos',  async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 }); // latest first
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get('/video/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    res.json(video);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get('/public/videos', async (req, res) => {
  const videos = await Video.find();
  res.json(videos);
});

router.get('/public/video/:id', async (req, res) => {
  const video = await Video.findById(req.params.id);
  if (!video) return res.status(404).json({ message: 'Video not found' });
  res.json(video);
});

// ------------------ Comments and Likes ------------------

// 📌 Add Comment
// router.post("/:id/comments", async (req, res) => {
//   const { email, text } = req.body;
//   const { videoId } = req.params;

//   try {
//     const video = await Video.findById(videoId);
//     if (!video) return res.status(404).json({ message: "Video not found" });

//     const newComment = {
//       user: email,
//       video: videoId,
//       text,
//     };

//     video.comments.push(newComment);
//     await video.save();

//     res.status(201).json({ message: "Comment added", comment: newComment });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
router.post("/:id/comments", async (req, res) => {
  const { email, text } = req.body;
  const videoId = req.params.id;

  try {
    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: "Video not found" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const newComment = {
      user: user._id,
      video: videoId,
      text,
    };

    video.comments.push(newComment);
    await video.save();

    res.status(201).json({ message: "Comment added", comment: newComment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 Get All Comments for a Video
router.get("/:id/comments", async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate("comments.user", "name email")
      .exec();

    if (!video) return res.status(404).json({ message: "Video not found" });

    res.status(200).json(video.comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// router.get("/:id/comments", async (req, res) => {
//   try {
//     const video = await Video.findById(req.params.videoId)
//       .populate("comments.user", "name") // Populate user name
//       .exec();

//     if (!video) return res.status(404).json({ message: "Video not found" });

//     res.status(200).json(video.comments);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// 📌 Add Like
// router.post("/:id/likes", async (req, res) => { //last updated
//   const { email } = req.body;
//   const videoId = req.params.id;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const video = await Video.findById(videoId);
//     if (!video) return res.status(404).json({ message: "Video not found" });

//     const likeIndex = video.likes.findIndex(
//       (like) => like.user.toString() === user._id.toString()
//     );

//     if (likeIndex !== -1) {
//       // ❌ Unlike
//       video.likes.splice(likeIndex, 1);
//       await video.save();
//       return res.status(200).json({ message: "Like removed" });
//     }

//     // ✅ Like
//     video.likes.push({ user: user._id });
//     await video.save();
//     return res.status(201).json({ message: "Video liked" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
router.post("/:id/likes", async (req, res) => {
  const { email } = req.body;
  const videoId = req.params.id;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: "Video not found" });

    const likeIndex = video.likes.findIndex(
      (like) => like.user.toString() === user._id.toString()
    );

    if (likeIndex !== -1) {
      // ❌ Unlike
      video.likes.splice(likeIndex, 1);
      await video.save();
      return res.status(200).json({ message: "Like removed" });
    }

    // ✅ Like (push with video field)
    video.likes.push({ user: user._id, video: video._id });
    await video.save();
    return res.status(201).json({ message: "Video liked" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// router.post("/:id/likes", async (req, res) => {
//   const { email } = req.body;
//   const videoId = req.params.id;

//   try {
//     // Get user ID by email
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     // Get the video
//     const video = await Video.findById(videoId);
//     if (!video) return res.status(404).json({ message: "Video not found" });

//     // Check if user already liked
//     const alreadyLiked = video.likes.some(
//       (like) => like.user.toString() === user._id.toString()
//     );
//     if (alreadyLiked) return res.status(400).json({ message: "Already liked" });

//     // Add like with ObjectId
//     const newLike = {
//       user: user._id,
//       video: video._id,
//     };

//     video.likes.push(newLike);
//     await video.save();

//     res.status(201).json({ message: "Video liked", like: newLike });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


// 📌 Get Like Count
// router.get("/:videoId/likes", async (req, res) => {
//   try {
//     const video = await Video.findById(req.params.videoId);
//     if (!video) return res.status(404).json({ message: "Video not found" });

//     res.status(200).json({ likeCount: video.likes.length });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
router.get("/:videoId/likes", async (req, res) => {
  try {
    const video = await Video.findById(req.params.videoId)
      .populate("likes.user", "name email")
      .exec();

    if (!video) return res.status(404).json({ message: "Video not found" });

    res.status(200).json(video.likes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 Remove Like
// router.delete("/:videoId/likes/:userId", async (req, res) => {
//   const { videoId, email } = req.params;

//   try {
//     const video = await Video.findById(videoId);
//     if (!video) return res.status(404).json({ message: "Video not found" });

//     video.likes = video.likes.filter(
//       (like) => like.user.toString() !== email
//     );

//     await video.save();
//     res.status(200).json({ message: "Like removed" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

router.delete("/:videoId/likes/:email", async (req, res) => {
  const { videoId, email } = req.params;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: "Video not found" });

    // Remove like by user ID
    video.likes = video.likes.filter(
      (like) => like.user.toString() !== user._id.toString()
    );

    await video.save();
    res.status(200).json({ message: "Like removed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});





router.get('/stack', authenticateAdmin, async (req, res) => {
  const stacks = await Stack.find();
  res.json(stacks);
});

router.get('/category', authenticateAdmin, async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

router.get('/sub-category', authenticateAdmin, async (req, res) => {
  const subCategories = await SubCategory.find();
  res.json(subCategories);
});
router.get('/stack/:id', authenticateAdmin, async (req, res) => {
  try {
    const stack = await Stack.findById(req.params.id);

    if (!stack) {
      return res.status(404).json({ message: 'Stack not found' });
    }

    res.json(stack); // Return the stack data
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

router.get('/category/:id', authenticateAdmin, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// GET single Sub-Category by ID
router.get('/sub-category/:id', authenticateAdmin, async (req, res) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id);

    if (!subCategory) {
      return res.status(404).json({ message: 'Sub-category not found' });
    }

    res.json(subCategory);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});




module.exports= router;
