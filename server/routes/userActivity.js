const express = require("express");
const router = express.Router();
const UserActivity = require("../model/userlogData");
const Video = require("../model/videoData");
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

router.post("/login-activity", authenticate, async (req, res) => {
  try {
    const activity = await UserActivity.findOneAndUpdate(
      { userId: req.user.id },
      {
        $push: {
          sessions: {
            loginAt: new Date(),
          },
        },
        $setOnInsert: {
          name: req.user.name || "Unknown",
          email: req.user.email,
        },
      },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: "Login activity recorded", activity });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post("/logout-activity", authenticate, async (req, res) => {
  try {
    const activity = await UserActivity.findOne({ userId: req.user.id });

    if (!activity || activity.sessions.length === 0) {
      return res.status(404).json({ message: "No active session found" });
    }

    activity.sessions[activity.sessions.length - 1].logoutAt = new Date();
    await activity.save();

    res.status(200).json({ message: "Logout activity recorded", activity });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post("/watched/:videoId", authenticate, async (req, res) => {
  try {
    const video = await Video.findById(req.params.videoId);
    if (!video) return res.status(404).json({ message: "Video not found" });

    const activity = await UserActivity.findOne({ userId: req.user.id });
    if (!activity || activity.sessions.length === 0)
      return res.status(404).json({ message: "No active session found" });

    const latestSession = activity.sessions[activity.sessions.length - 1];

    latestSession.watchedVideos.push({
      videoId: video._id,
      title: video.title,
    });

    await activity.save();

    res.status(200).json({ message: "Watched video added", activity });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/comment/:videoId", authenticate, async (req, res) => {
  try {
    const { text } = req.body;
    const video = await Video.findById(req.params.videoId);
    if (!video) return res.status(404).json({ message: "Video not found" });

    const activity = await UserActivity.findOne({ userId: req.user.id });
    if (!activity || activity.sessions.length === 0)
      return res.status(404).json({ message: "No active session found" });

    const latestSession = activity.sessions[activity.sessions.length - 1];

    latestSession.comments.push({
      videoId: video._id,
      title: video.title,
      comment: text,
    });

    await activity.save();

    res.status(200).json({ message: "Comment activity recorded", activity });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post("/like/:videoId", authenticate, async (req, res) => {
  try {
    const video = await Video.findById(req.params.videoId);
    if (!video) return res.status(404).json({ message: "Video not found" });

    const activity = await UserActivity.findOne({ userId: req.user.id });
    if (!activity || activity.sessions.length === 0)
      return res.status(404).json({ message: "No active session found" });

    const latestSession = activity.sessions[activity.sessions.length - 1];

    latestSession.likes.push({
      videoId: video._id,
      title: video.title,
    });

    await activity.save();

    res.status(200).json({ message: "Like activity recorded", activity });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/all-activities", authenticate, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    // ✅ Filter out activities where the user role is not 'admin'
    const activities = await UserActivity.find({ role: { $ne: "admin" } });
    res.status(200).json(activities);
  } catch (err) {
    console.error("Error fetching activities:", err);
    res.status(500).json({ error: err.message });
  }
});






router.get("/activity-summary", authenticate, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const activities = await UserActivity.find();

    const summary = activities.map(user => {
      const totalSessions = user.sessions.length;
      let totalLogins = 0;
      let totalWatched = 0;
      let totalLikes = 0;
      let totalComments = 0;

      user.sessions.forEach(session => {
        if (session.loginAt) totalLogins += 1;
        if (session.watchedVideos) totalWatched += session.watchedVideos.length;
        if (session.likes) totalLikes += session.likes.length;
        if (session.comments) totalComments += session.comments.length;
      });

      return {
        userId: user.userId,
        name: user.name,
        email: user.email,
        totalSessions,
        totalLogins,
        totalWatched,
        totalLikes,
        totalComments,
      };
    });

    res.status(200).json(summary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// DELETE all activities - only admin
router.delete("/clear-all", authenticate, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    await UserActivity.deleteMany({});
    res.status(200).json({ message: "All user activities cleared" });
  } catch (err) {
    console.error("Error clearing activities:", err);
    res.status(500).json({ error: err.message });
  }
});


module.exports=router