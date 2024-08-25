const express = require("express");
const authController = require("../Controllers/authController");
const userController = require("../Controllers/userController");
const router = express.Router();

// Auth Routers
router.route("/").get(authController.home);
router.route("/register").post(authController.Register);
router.route("/login").post(authController.Login);
router.route("/updatepassword/:id").patch(authController.updatePassword);

// User Routes
router.route("/user/:id").get(userController.getUser);

module.exports = router;
