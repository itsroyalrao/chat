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
  createdAt: {
    type: Number,
    default: Date.now(),
  },
});

module.exports.Chat = mongoose.model("chat", chatSchema);

const archivedChatSchema = new mongoose.Schema({
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
  createdAt: {
    type: Number,
  },
});

module.exports.ArchivedChat = mongoose.model(
  "archived chat",
  archivedChatSchema
);
