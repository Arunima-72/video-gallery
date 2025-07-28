// const mongoose = require('mongoose');

// const videoSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true
//   },
//   description: String,
//   fileUrl: {
//     type: String,
//     required: true
//   },
//   fileType: {
//     type: String,
//     default: "video/mp4"
//   },
//   fileSize: Number, // in bytes
//   uploadedBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Admin",
//     required: false
//   },
//   stack: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Stack",
//     required: true
//   },
//   category: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Category",
//     required: true
//   },
//   subCategory: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "SubCategory",
//     required: true
//   },
//    image: {
//     type: String, // store image URL or filename
//     required: false
//   }
// }, { timestamps: true });

// module.exports= mongoose.model("Video", videoSchema);
const mongoose = require('mongoose');
const { Schema } = mongoose;

// 💬 Comment Schema
const commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'userdb', // or 'Admin' if you use Admin accounts for commenting
    required: true
  },
  video: {
    type: Schema.Types.ObjectId,
    ref: 'video',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// ❤️ Like Schema
const likeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'userdb', // or 'Admin' based on your app logic
    required: true
  },
  video: {
    type: Schema.Types.ObjectId,
    ref: 'Video',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// 🎬 Video Schema
const videoSchema = new Schema({
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
  fileSize: Number,

  uploadedBy: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    required: false
  },
  stack: {
    type: Schema.Types.ObjectId,
    ref: "Stack",
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  subCategory: {
    type: Schema.Types.ObjectId,
    ref: "SubCategory",
    required: true
  },
  image: String,
  overviewPdf: {
  type: String // URL or file path of uploaded PDF
},


  // 💬 Comments and ❤️ Likes (embedded)
  comments: [commentSchema],
  likes: [likeSchema]

}, { timestamps: true });



module.exports = mongoose.model("video", videoSchema);

