const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
  name: String,
  data: Buffer,
});

module.exports = mongoose.model("Image", imageSchema);
