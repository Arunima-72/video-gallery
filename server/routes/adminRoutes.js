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

// function authenticate(req, res, next) {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Authorization token missing" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET );

//     // Attach user data and role to the request
//     req.user = {
//       id: decoded.id,
//       role: decoded.role,
//       email: decoded.email,
//     };
//     next();
//   } catch (err) {
//     console.error("JWT Verification failed:", err);
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// }



function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.userId,
      role: decoded.role, // can be 'admin' or 'user'
      email: decoded.email,
    };

    // ❌ Don't restrict only admins
    next();
  } catch (err) {
    console.error("JWT Verification failed:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}





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
  { name: 'overviewPdf', maxCount: 1 } , // PDF
    { name: 'image', maxCount: 1 }
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
    // const { name, stack } = req.body;

    // if (!name || !stack) {
    //   return res.status(400).json({ error: "Name and stack are required" });
    // }

    // const category = new Category({
    //   name,
    //   stack,
    //   image: req.file ? req.file.filename : undefined
    // });
const { name } = req.body;

if (!name) {
  return res.status(400).json({ error: "Name is required" });
}

const category = new Category({
  name,
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


// router.put(
//   '/edit/category/:id',
//   authenticateAdmin,
//   upload.single("image"),
//   async (req, res) => {
//     try {
//       const { name } = req.body;
//       const updateData = { name };

//       if (req.file) {
//         updateData.image = req.file.filename;
//       }

//       const updatedCategory = await Category.findByIdAndUpdate(
//         req.params.id,
//         updateData,
//         { new: true, runValidators: true }
//       );

//       if (!updatedCategory) {
//         return res.status(404).json({ message: "Category not found" });
//       }

//       res.json({ message: "Category updated", category: updatedCategory });
//     } catch (err) {
//       console.error(err);
//       res.status(400).json({ error: err.message });
//     }
//   }
// );
router.put(
  '/edit/category/:id',
  authenticateAdmin,
  upload.single("image"),
  async (req, res) => {
    try {
      // const { name, stack } = req.body; // ✅ include stack
      // const updateData = { name };

      // if (stack) {
      //   updateData.stack = stack; // ✅ update stack field
      // }
const { name } = req.body;
const updateData = {};

if (name) updateData.name = name;
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


// router.get('/category', authenticateAdmin, async (req, res) => {
//   try {
//     const categories = await Category.find().populate('stack'); // ✅ populate stack
//     res.json(categories);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

router.get('/category', async (req, res) => {
  // const { stackId } = req.query;

  try {
    // const filter = stackId ? { stack: stackId } : {};
    // const categories = await Category.find(filter);
    const categories = await Category.find(); 
    res.json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: "Server error" });
  }
});



// // ------------------ SubCategory Routes ------------------
// // router.post('/sub-category', authenticateAdmin, async (req, res) => {
// //   try {
// //     const { name, category } = req.body;
// //     const subCategory = new SubCategory({ name, category });
// //     await subCategory.save();
// //     res.status(201).json(subCategory);
// //   } catch (err) {
// //     res.status(400).json({ error: err.message });
// //   }
// // });
// router.post('/sub-category', authenticateAdmin, uploadImage.single('image'), async (req, res) => {
//   try {
//     const { name, category } = req.body;

//     if (!name || !category) {
//       return res.status(400).json({ error: "Name and category are required" });
//     }

//     const subCategory = new SubCategory({
//       name,
//       category,
//       image: req.file ? req.file.filename : undefined
//     });

//     await subCategory.save();
//     res.status(201).json(subCategory);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });
// router.delete('/sub-category/:id', authenticateAdmin, async (req, res) => {
//   try {
//     await SubCategory.findByIdAndDelete(req.params.id);
//     res.json({ message: 'SubCategory deleted' });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// router.put(
//   '/edit/sub-category/:id',
//   authenticateAdmin,
//   upload.single("image"),
//   async (req, res) => {
//     try {
//       const { name } = req.body;
//       const updateData = { name };

//       if (req.file) {
//         updateData.image = req.file.filename;
//       }

//       const updatedSubCategory = await SubCategory.findByIdAndUpdate(
//         req.params.id,
//         updateData,
//         { new: true, runValidators: true }
//       );

//       if (!updatedSubCategory) {
//         return res.status(404).json({ message: "Sub-category not found" });
//       }

//       res.json({
//         message: "Sub-category updated",
//         subCategory: updatedSubCategory,
//       });
//     } catch (err) {
//       console.error(err);
//       res.status(400).json({ error: err.message });
//     }
//   }
// );

// =======================
// CREATE SUB-CATEGORY
// =======================
router.post(
  '/sub-category',
  authenticateAdmin,
  uploadImage.single('image'),
  async (req, res) => {
    try {
      const { name, category } = req.body;

      if (!name || !category) {
        return res
          .status(400)
          .json({ error: 'Name and category are required' });
      }

      const subCategory = new SubCategory({
        name,
        category,
        image: req.file ? req.file.filename : undefined,
      });

      await subCategory.save();
      res.status(201).json({ message: 'Sub-category created', subCategory });
    } catch (err) {
      console.error('Create error:', err);
      res.status(400).json({ error: err.message });
    }
  }
);

// =======================
// UPDATE SUB-CATEGORY
// =======================
// router.put(
//   '/edit/sub-category/:id',
//   authenticateAdmin,
//   uploadImage.single('image'),
//   async (req, res) => {
//     try {
//       const { name } = req.body;
//       const updateData = { name };

//       if (req.file) {
//         updateData.image = req.file.filename;
//       }

//       const updatedSubCategory = await SubCategory.findByIdAndUpdate(
//         req.params.id,
//         updateData,
//         { new: true, runValidators: true }
//       );

//       if (!updatedSubCategory) {
//         return res.status(404).json({ message: 'Sub-category not found' });
//       }

//       res.json({
//         message: 'Sub-category updated',
//         subCategory: updatedSubCategory,
//       });
//     } catch (err) {
//       console.error('Update error:', err);
//       res.status(400).json({ error: err.message });
//     }
//   }
// );
router.put(
  '/edit/sub-category/:id',
  authenticateAdmin,
  uploadImage.single('image'),
  async (req, res) => {
    try {
      // const { name, category, stack } = req.body;
const { name, category } = req.body;
      const updateData = {};
      if (name) updateData.name = name;
      if (category) updateData.category = category;
      // if (stack) updateData.stack = stack;
      if (req.file) updateData.image = req.file.filename;

      const updatedSubCategory = await SubCategory.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true }
      );

      if (!updatedSubCategory) {
        return res.status(404).json({ message: 'Sub-category not found' });
      }

      res.json({
        message: 'Sub-category updated',
        subCategory: updatedSubCategory,
      });
    } catch (err) {
      console.error('Sub-category update failed:', err);
      res.status(500).json({ error: 'Server error during update' });
    }
  }
);
// =======================
// DELETE SUB-CATEGORY
// =======================
router.delete(
  '/sub-category/:id',
  authenticateAdmin,
  async (req, res) => {
    try {
      await SubCategory.findByIdAndDelete(req.params.id);
      res.json({ message: 'Sub-category deleted' });
    } catch (err) {
      console.error('Delete error:', err);
      res.status(400).json({ error: err.message });
    }
  }
);

// ------------------ Video Routes ------------------
router.post(
  '/video',
  authenticateAdmin,
  uploadFiles, // should handle 'file', 'overviewPdf', and 'thumbnail'
  async (req, res) => {
    try {
      const { title, description, stack, category, subCategory,videoUrl } = req.body;

      const videoFile = req.files['file']?.[0];
      const pdfFile = req.files['overviewPdf']?.[0];
      const thumbFile = req.files['image']?.[0];

      if (!videoFile) {
        return res.status(400).json({ error: 'Video file is required' });
      }

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
        videoUrl,
        
        image: thumbFile ? thumbFile.path : null,
        overviewPdf: pdfFile ? pdfFile.path : null
      });

      await video.save();
      res.status(201).json(video);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message });
    }
  }
);




router.put('/video/:id', authenticateAdmin, uploadFiles, async (req, res) => {
  try {
    const {
      title,
      description,
      stack,
      category,
      subCategory,
      videoUrl
    } = req.body;

    const updateData = {
      title,
      description,
      stack,
      category,
      subCategory,
      videoUrl
    };

    if (req.files['file']) {
      updateData.fileUrl = req.files['file'][0].path;
      updateData.fileType = req.files['file'][0].mimetype;
      updateData.fileSize = req.files['file'][0].size;
    }

    if (req.files['overviewPdf']) {
      updateData.overviewPdf = req.files['overviewPdf'][0].path;
    }

    if (req.files['image']) {
      updateData.image = req.files['image'][0].path;
    }

    const updatedVideo = await Video.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updatedVideo) {
      return res.status(404).json({ error: "Video not found" });
    }

    res.json({ message: "Video updated successfully", updatedVideo });
  } catch (err) {
    console.error("Video update error:", err);
    res.status(500).json({ error: "Server error during video update" });
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

// router.delete('/video/:id', authenticateAdmin, async (req, res) => {
//   try {
//     const video = await Video.findById(req.params.id);
//     if (!video) return res.status(404).json({ message: 'Video not found' });

//     if (fs.existsSync(video.fileUrl)) fs.unlinkSync(video.fileUrl);

//     await Video.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Video deleted' });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });


router.delete('/video/:id', authenticateAdmin, async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    if (video.fileUrl && fs.existsSync(video.fileUrl)) fs.unlinkSync(video.fileUrl);
    if (video.image && fs.existsSync(video.image)) fs.unlinkSync(video.image);
    if (video.overviewPdf && fs.existsSync(video.overviewPdf)) fs.unlinkSync(video.overviewPdf);

    res.json({ message: 'Video deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Server error during video deletion' });
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
// router.get('/video/:id', async (req, res) => {
//   try {
//     const video = await Video.findById(req.params.id);
    
//     if (!video) return res.status(404).json({ message: 'Video not found' });

//     res.json(video);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
router.get('/video/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate('stack', 'name')
      .populate('category', 'name')
      // .populate('subcategory', 'name');

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

router.get('/videodetails/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate('stack', 'name')
      .populate('category', 'name')
      .populate('subCategory', 'name'); // ✅ correct field name

    if (!video) return res.status(404).json({ message: 'Video not found' });

    res.json({
      _id: video._id,
      title: video.title,
      description: video.description,
      image: video.image, 
      videoUrl: video.videoUrl , // fallback support
      overviewPdf: video.overviewPdf || null,
      stack: video.stack?._id,
      stackName: video.stack?.name,
      category: video.category?._id,
      categoryName: video.category?.name,
      subCategory: video.subCategory?._id,
      subCategoryName: video.subCategory?.name,
    });
  } catch (err) {
    console.error('Error fetching video:', err);
    res.status(500).json({ error: err.message });
  }
});


// ------------------ Comments and Likes ------------------




router.post("/:id/comments", authenticate, async (req, res) => {
  const { text } = req.body;
  const videoId = req.params.id;

  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: "Video not found" });

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



router.get("/:id/comments", authenticate, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate("comments.user", "name email")
      .exec();

    if (!video) return res.status(404).json({ message: "Video not found" });

    // ✅ Return all comments (not just user's)
    res.status(200).json(video.comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// router.delete("/:id/comments/:commentId", authenticate, async (req, res) => {
//   try {
//     const video = await Video.findById(req.params.id);
//     if (!video) return res.status(404).json({ message: "Video not found" });

//     const comment = video.comments.id(req.params.commentId);
//     if (!comment) return res.status(404).json({ message: "Comment not found" });

//     // ✅ Check permissions
//     if (req.user.role !== 'admin' && comment.user.toString() !== req.user.id) {
//       return res.status(403).json({ message: "Not allowed to delete this comment" });
//     }

//     comment.remove();
//     await video.save();

//     res.status(200).json({ message: "Comment deleted" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

router.delete("/:id/comments/:commentId", authenticate, async (req, res) => {
  try {
    const { id, commentId } = req.params;
    const video = await Video.findById(id);

    if (!video) return res.status(404).json({ message: "Video not found" });

    // ✅ Find the comment
    const comment = video.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    // ✅ Allow deletion if admin OR comment owner
    if (req.user.role !== "admin" && comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // ✅ Remove comment
    video.comments.pull({ _id: commentId });
    await video.save();

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id/comments/:commentId", authenticate, async (req, res) => {
  const { id: videoId, commentId } = req.params;
  const { text } = req.body;

  try {
    // ✅ Find video
    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: "Video not found" });

    // ✅ Find comment
    const comment = video.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    // ✅ Allow edit if admin or comment owner
    if (req.user.role !== "admin" && comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // ✅ Update comment text
    comment.text = text;
    comment.updatedAt = new Date(); // Optional: track updates

    await video.save();

    res.status(200).json({ message: "Comment updated successfully", comment });
  } catch (error) {
    console.error("Comment edit failed:", error);
    res.status(500).json({ error: error.message });
  }
});


router.post("/:id/likes",authenticate, async (req, res) => {
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

// router.get("/:videoId/likes",authenticate, async (req, res) => {
//   try {
//     const video = await Video.findById(req.params.videoId)
//       .populate("likes.user", "name email")
//       .exec();

//     if (!video) return res.status(404).json({ message: "Video not found" });

//     res.status(200).json(video.likes);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

router.get("/:id/likes", authenticate, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate("likes.user", "name email") // ✅ populate user info
      .exec();

    if (!video) return res.status(404).json({ message: "Video not found" });

    // ✅ Return all likes
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


// Get all stacks
router.get('/stacks', authenticate, async (req, res) => {
  const stacks = await Stack.find();
  res.json(stacks);
});

// Get categories by stack
router.get('/categories', authenticate, async (req, res) => {
  const { stackId } = req.query;
  const categories = await Category.find({ stack: stackId });
  res.json(categories);
});

// Get subcategories by category
router.get('/sub-categories', authenticate, async (req, res) => {
  const { categoryId } = req.query;
  const subCategories = await SubCategory.find({ category: categoryId });
  res.json(subCategories);
});








module.exports= router;
