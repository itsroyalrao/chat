const express = require('express');
const chatController = require('../controllers/chat');

const router = express.Router();

router.route('/').post(chatController.createChat);

module.exports = router;