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

    await userService.createUser(data);
    res.status(201).json({ message: "register suceess" });
  } catch (error) {
    console.log(error);
  }
};
authController.login = (req, res, next) => {};
authController.getMe = (req, res, next) => {};

module.exports = authController;
