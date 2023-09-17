const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  group: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("chat", chatSchema);
