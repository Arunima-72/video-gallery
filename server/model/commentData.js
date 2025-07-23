const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'userdb', // Reference to user model
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false } // prevents creating an _id for each comment
);

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'userdb', // Admin user who created the post
      required: true,
    },
    comments: [commentSchema], // Array of comments
  },
  { timestamps: true }
);

module.exports = mongoose.model('post', postSchema);
