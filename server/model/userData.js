const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
 password: { 
        type: String,
         required: true },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  city: String,
  country: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  isActive: { type: Boolean, default: true },


  // ✅ New field: array of saved videos
  savedVideos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'video' // assuming your video model is named 'video'
  }],
  // lastLoginAt: {
  //   type: Date,
  //   default: null,
  // },
  // lastLogoutAt: {
  //   type: Date,
  //   default: null,
  // },
}, {
  timestamps: true, // adds createdAt and updatedAt automatically
});

module.exports = mongoose.model('userdb', userSchema);

