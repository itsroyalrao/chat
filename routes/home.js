const express = require("express");
const homeController = require("../controllers/createGroup");
const myGroupsController = require("../controllers/myGroups");
const allGroupsController = require("../controllers/allGroups");
const chatController = require("../controllers/chat");

const router = express.Router();

router.route("/friends").get(chatController.getFriends);
router.route("/create-group").post(homeController.createGroup);
router.route("/join-group").post(homeController.joinGroup);
router.route("/myGroups").post(myGroupsController.getGroupsNames);
router.route("/allGroups").post(allGroupsController.getGroupsNames);

module.exports = router;
