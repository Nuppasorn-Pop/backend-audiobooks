const Joi = require("joi");
const validatorSchema = {};
validatorSchema.registerSchema = Joi.object({
  firstName: Joi.string().required().trim(),
  lastName: Joi.string().required().trim(),
  emailOrMobile: Joi.alternatives([
    Joi.string().email({ tlds: false }),
    Joi.string().pattern(/^[0-9]{10}$/),
  ]),
  password: Joi.string().required().pattern(new RegExp("^[0-9a-zA-Z]{5,}$")),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")),

  email: Joi.forbidden().when("emailOrMobile", {
    is: Joi.string().email({ tlds: false }),
    then: Joi.string().default(Joi.ref("emailOrMobile")),
  }),

  mobile: Joi.forbidden().when("emailOrMobile", {
    is: Joi.string().pattern(/^[0-9]{10}$/),
    then: Joi.string().default(Joi.ref("emailOrMobile")),
  }),
});

module.exports = validatorSchema;
