const express = require("express");
const authController = require("../controller/auth-controller");
const {
  registorValidator,
  loginValidator,
} = require("../middleware/validator");
const authRouer = express.Router();

authRouer.post("/register", registorValidator, authController.register);
authRouer.post("/login", loginValidator, authController.login);
authRouer.get("/me", authController.getMe);

module.exports = authRouer;
