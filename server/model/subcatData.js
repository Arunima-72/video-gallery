const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  image: {
    type: String, // store image URL or filename
    required: false
  }
}, { timestamps: true });

module.exports= mongoose.model("SubCategory", subCategorySchema);
