const Chat = require('../models/chat');

const createChat = async (req, res) => {
  try {
    const { user, msg } = req.body;

    await Chat.create({ email: user, message: msg });
    res.status(200).json({ success: true });
  } catch (e) {
    console.log(e.message);
  }
}

module.exports = { createChat };