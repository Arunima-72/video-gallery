// routes/videoViews.js

const express = require('express');
const router = express.Router();
const VideoView = require('../model/videoView');
const authMiddleware = require('../routes/routesUser'); // assuming JWT-based auth
const mongoose = require('mongoose');

// @desc   Track a video view
// @route  POST /video-views/video/:videoId/track
// @access Private
const jwt = require("jsonwebtoken");

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
router.post('/video/:videoId/track', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const videoId = req.params.videoId;

  try {
    const existing = await VideoView.findOne({ user: userId, video: videoId });

    if (!existing) {
      const view = new VideoView({ user: userId, video: videoId });
      await view.save();
    }

    const totalViews = await VideoView.countDocuments({ video: videoId });

    res.json({ success: true, totalViews });
  } catch (err) {
    console.error('Error tracking view:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// @desc   Get all views for a video
// @route  GET /video-views/video/:videoId
// @access Private or Public
router.get('/video/:videoId', async (req, res) => {
  try {
    const views = await VideoView.find({ video: req.params.videoId });
    res.json(views);
  } catch (err) {
    console.error('Error fetching views:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
