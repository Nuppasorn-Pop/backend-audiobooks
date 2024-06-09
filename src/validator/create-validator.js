const Joi = require("joi");
exports.createAudiobookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  audioFile: Joi.string().required(),
  voiceActor: Joi.string(),
  bookType: Joi.string(),
  bookImage: Joi.string(),
  audioFile: Joi.string(),
  detail: Joi.string(),
});
