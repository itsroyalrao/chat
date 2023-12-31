const express = require("express");
const authController = require("../controllers/auth");

const router = express.Router();

router.route("/").post(authController.signup);
router.route("/login").post(authController.login);

module.exports = router;
