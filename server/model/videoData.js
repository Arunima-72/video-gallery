const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  fileUrl: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    default: "video/mp4"
  },
  fileSize: Number, // in bytes
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true
  },
  stack: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stack",
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    required: true
  },
   image: {
    type: String, // store image URL or filename
    required: false
  }
}, { timestamps: true });

module.exports= mongoose.model("Video", videoSchema);
