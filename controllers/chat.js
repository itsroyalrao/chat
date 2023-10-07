const { Chat } = require("../models/chat");
const Group = require("../models/group");
const Users = require("../models/auth");

const createChat = async (req, res) => {
  try {
    const { user, msg, gname, messageType } = req.body;

    if (messageType === "text")
      await Chat.create({ email: user, message: msg, group: gname });
    else {
      const { link } = req.body;
      await Chat.create({
        email: user,
        message: msg,
        group: gname,
        messageType,
        link,
      });
    }
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
    chats.forEach((msg) => {
      const message = msg.message;
      const messageType = msg.messageType;
      if (messageType === "text") messages.push({ message, messageType });
      else {
        const link = msg.link;
        messages.push({ message, messageType, link });
      }
    });

    res.status(200).json({ success: true, messages });
  } catch (e) {
    console.log(e.message);
  }
};

const getFriends = async (req, res) => {
  try {
    const { gname } = req.query;
    const users = await Group.findOne({ name: gname });

    return res.status(200).json({ success: true, users });
  } catch (e) {
    console.log(e.message);
  }
};

const removeFriend = async (req, res) => {
  try {
    const { name, gname, email } = req.query;

    const userList = await Group.findOne({ name: gname });
    if (userList.admins.includes(email)) {
      const updatedUserList = [];

      for (const user of userList.users) {
        const result = await Users.findOne({ email: user });
        if (result.name !== name) {
          updatedUserList.push(user);
        }
      }

      await Group.findOneAndUpdate({ name: gname }, { users: updatedUserList });
      return res.status(200).json({ success: true });
    } else {
      return res.json({ success: false, msg: "You are not an admin" });
    }
  } catch (e) {
    console.log(e.message);
  }
};

const searchFriend = async (req, res) => {
  try {
    const { friend } = req.body;
    const user = await Users.findOne({ name: friend });

    if (user) return res.status(200).json({ success: true, user });
    else return res.json({ success: false });
  } catch (e) {
    console.log(e.message);
  }
};

const friendDetails = async (req, res) => {
  try {
    const { friend } = req.query;
    const user = await Users.findOne({ email: friend });

    if (user) return res.status(200).json({ success: true, user });
    else return res.json({ success: false });
  } catch (e) {
    console.log(e.message);
  }
};

const getUsername = async (req, res) => {
  try {
    const { username } = req.query;
    const user = await Users.findOne({ email: username });

    if (user) return res.status(200).json({ success: true, user });
    else return res.json({ success: false });
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  createChat,
  getChats,
  getFriends,
  removeFriend,
  searchFriend,
  friendDetails,
  getUsername,
};
