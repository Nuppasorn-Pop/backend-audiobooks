const createError = require("../utils/create-error");

const adminAuthenticate = (req, res, next) => {
  const role = req.user.role;
  console.log(role, "-------------------------------");
  if (role === "USER") {
    createError({
      message: "forbidden",
      statusCode: 403,
    });
  }
  next();
};
module.exports = adminAuthenticate;
