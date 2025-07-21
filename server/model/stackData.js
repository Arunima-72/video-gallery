const mongoose = require('mongoose');

const stackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  image: {
    type: String, // store image URL or filename
    required: false
  }
}, { timestamps: true });

 
 module.exports = mongoose.model("Stack", stackSchema);
