// models/VideoView.js

const mongoose = require('mongoose');

const videoViewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userdb', // assuming your user model is named 'User'
    required: true
  },
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'video', // assuming your video model is named 'Video'
    required: true
  },
  viewedAt: {
    type: Date,
    default: Date.now
  },
  sessionId: {
    type: String // optional: to support truly unique views per browser session
  }
});

videoViewSchema.index({ user: 1, video: 1 }, { unique: true }); // Prevent duplicate views

module.exports = mongoose.model('VideoView', videoViewSchema);
