const { registerSchema, loginSchema } = require("../validator/auth-validator");

exports.registorValidator = (req, res, next) => {
  const { value, error } = registerSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  }

  req.input = value;
  next();
};

exports.loginValidator = (req, res, next) => {
  const { value, error } = loginSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  }

  req.input = value;
  next();
};
