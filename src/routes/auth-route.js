const express = require("express");
const authController = require("../controller/auth-controller");
const validatorSchema = require("../middleware/validator");
const authRouer = express.Router();

authRouer.post(
  "/register",
  validatorSchema.registerSchema,
  authController.login
);
authRouer.post("/login", authController.login);
authRouer.get("/me", authController.getMe);

module.exports = authRouer;
