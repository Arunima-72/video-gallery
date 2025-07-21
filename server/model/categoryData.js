const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  stack: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stack",
    required: true
  },
    image: {
    type: String, // store image URL or filename
    required: false
  }
}, { timestamps: true });

module.exports= mongoose.model("Category", categorySchema);
