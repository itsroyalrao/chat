const express = require("express");
const chatController = require("../controllers/chat");

const router = express.Router();

router
  .route("/")
  .post(chatController.createChat)
  .delete(chatController.removeFriend);
router.route("/chats").post(chatController.getChats);
router
  .route("/friend")
  .post(chatController.searchFriend)
  .get(chatController.friendDetails);

module.exports = router;
