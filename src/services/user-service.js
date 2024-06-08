const { prisma } = require("../prisma/prisma");

const userService = {};

userService.createUser = (data) => prisma.user.create({ data });
userService.findUserByEmailOrMobile = (emailOrMobile) =>
  prisma.user.findFirst({
    where: {
      OR: [{ email: emailOrMobile }, { mobile: emailOrMobile }],
    },
  });
userService.findUserById = (userId) =>
  prisma.user.findFirst({
    where: { id: userId },
  });

module.exports = userService;
