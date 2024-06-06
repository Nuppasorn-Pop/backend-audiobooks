const hashService = require("../services/bcrypt-service");
const jwtService = require("../services/jwt-service");
const userService = require("../services/user-service");
const createError = require("../utils/create-error");

const authController = {};
authController.register = async (req, res, next) => {
  try {
    const data = req.input;
    const isExists = await userService.findUserByEmailOrMobile(
      data.email || data.mobile
    );
    if (isExists) {
      createError({
        message: "Email or Mobile already in use",
        status: 400,
        field: "emailOrMobile",
      });
    }

    data.password = await hashService.hash(data.password);
    await userService.createUser(data);
    res.status(201).json({ message: "register suceess" });
  } catch (error) {
    console.log(error);
  }
};
authController.login = async (req, res, next) => {
  try {
    const isExists = await userService.findUserByEmailOrMobile(
      req.input.emailOrMobile
    );
    if (!isExists) {
      createError({
        message: "Email or Mobile is invalid",
        status: 400,
      });
    }

    const isMatch = await hashService.compare(
      req.input.password,
      isExists.password
    );

    if (isMatch) {
      createError({
        message: "Password is invalid",
        status: 400,
      });
    }

    jwtService.sign({ id: isExists.id });
    res.status(200).json({ message: "Login success" });
  } catch (error) {
    console.log(error);
  }
};
authController.getMe = (req, res, next) => {};

module.exports = authController;
