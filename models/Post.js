const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  category: {
    type: String,
    required: false,
  },
  categoryId: {
    type: Number,
    required: false,
  },
  product: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: false,
  },
  quantity: {
    type: Number,
    required: false,
  },
  unit: {
    type: String,
    required: false,
  },
  storeName: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  province: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  cloudinaryId: {
    type: String,
    required: false,
  },
  caption: {
    type: String,
    required: false,
  },
  stars: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userName: {
    type: mongoose.Schema.Types.String,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);
