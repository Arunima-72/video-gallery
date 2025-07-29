const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  loginAt: { type: Date, default: Date.now },
  logoutAt: { type: Date },
  watchedVideos: [
    {
      videoId: { type: mongoose.Schema.Types.ObjectId, ref: "Video" },
      title: String,
      watchedAt: { type: Date, default: Date.now },
    },
  ],
  comments: [
    {
      videoId: { type: mongoose.Schema.Types.ObjectId, ref: "Video" },
      title: String,
      comment: String,
      commentedAt: { type: Date, default: Date.now },
    },
  ],
  likes: [
    {
      videoId: { type: mongoose.Schema.Types.ObjectId, ref: "Video" },
      title: String,
      likedAt: { type: Date, default: Date.now },
    },
  ],
});

const userActivitySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "userdb", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    sessions: [sessionSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserActivity", userActivitySchema);

