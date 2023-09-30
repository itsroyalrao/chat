const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  users: {
    type: Array,
    required: true,
  },
  admins: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Group", groupSchema);
