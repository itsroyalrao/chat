const express = require("express");
const homeController = require("../controllers/createGroup");
const myGroupsController = require("../controllers/myGroups");
const allGroupsController = require("../controllers/allGroups");

const router = express.Router();

router.route("/create-group").post(homeController.createGroup);
router.route("/join-group").post(homeController.joinGroup);
router.route("/myGroups").post(myGroupsController.getGroupsNames);
router.route("/allGroups").post(allGroupsController.getGroupsNames);

module.exports = router;
