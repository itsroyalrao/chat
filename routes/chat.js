const express = require('express');
const chatController = require('../controllers/chat');

const router = express.Router();

router.route('/').post(chatController.createChat);
router.route('/chats').post(chatController.getChats);

module.exports = router;