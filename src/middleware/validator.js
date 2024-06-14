const createError = require("../utils/create-error");
const { registerSchema, loginSchema } = require("../validator/auth-validator");
const { createAudiobookSchema } = require("../validator/create-validator");

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

exports.createAudiobookValidator = (req, res, next) => {
  const { value, error } = createAudiobookSchema.validate(req.body);
  console.log("---------------------------------------", req.files);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  }

  if (!req.files.audioFile) {
    createError({
      message: "Audio File is required",
      statusCode: 400,
      field: "audioFile",
    });
  }

  req.input = value;
  next();
};
