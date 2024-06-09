const express = require("express");
const authenticate = require("../middleware/authenticate");
const authController = require("../controller/auth-controller");
const {
  registorValidator,
  loginValidator,
} = require("../middleware/validator");
const authRouter = express.Router();

authRouter.post("/register", registorValidator, authController.register);
authRouter.post("/login", loginValidator, authController.login);
authRouter.get("/me", authenticate, authController.getMe);

module.exports = authRouter;
