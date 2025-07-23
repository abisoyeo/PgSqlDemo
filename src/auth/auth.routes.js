const express = require("express");
const authController = require("./auth.controller");

const router = express.Router();

router.post("/register", authController.register);
router.get("/verify-email/:token", authController.verifyEmail);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword); // protected?
router.post("/reset-password/:token", authController.resetPassword);

module.exports = router;
