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
        statusCode: 400,
        field: "emailOrMobile",
      });
    }

    data.password = await hashService.hash(data.password);
    await userService.createUser(data);
    res.status(201).json({ message: "register suceess" });
  } catch (error) {
    next(error);
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
        statusCode: 400,
      });
    }

    const isMatch = await hashService.compare(
      req.input.password,
      isExists.password
    );

    if (isMatch) {
      createError({
        message: "Password is invalid",
        statusCode: 400,
      });
    }

    const accessToken = jwtService.sign({ id: isExists.id });
    res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};
authController.getMe = (req, res, next) => {};

module.exports = authController;
