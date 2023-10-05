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
  messageType: {
    type: String,
    required: true,
    default: "text",
  },
  link: {
    type: String,
  },
});

module.exports = mongoose.model("chat", chatSchema);
