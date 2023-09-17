const Chat = require("../models/chat");

const createChat = async (req, res) => {
  try {
    const { user, msg, gname } = req.body;

    await Chat.create({ email: user, message: msg, group: gname });
    res.status(200).json({ success: true });
  } catch (e) {
    console.log(e.message);
  }
};

const getChats = async (req, res) => {
  try {
    const { gname } = req.body;
    const chats = await Chat.find({ group: gname });

    const messages = [];
    chats.forEach((msg) => messages.push(msg.message));

    res.status(200).json({ success: true, messages });
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = { createChat, getChats };
