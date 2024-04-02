const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  // Add field for storing panoramic view URLs
  panoramicViewUrls: [{ type: String, required: true }],
});

module.exports = mongoose.model("Property", propertySchema);
