const audiobookService = require("../services/audiobook-service");
const uploadService = require("../services/upload-service");
const createError = require("../utils/create-error");
const fs = require("fs/promises");

const audiobookController = {};

audiobookController.createAudiobook = async (req, res, next) => {
  try {
    const data = req.input;
    data.userId = req.user.id;

    const isExists = await audiobookService.findAudiobookByTitle(data.title);

    if (isExists) {
      createError({
        message: "title already in use",
        statusCode: 400,
      });
    }

    const promises = [];
    if (req.files.bookImage) {
      const result = uploadService
        .upload(req.files.bookImage[0].path)
        .then((url) => ({ url, key: "bookImage" }));
      promises.push(result);
    }
    if (req.files.audioFile) {
      const result = uploadService
        .upload(req.files.audioFile[0].path)
        .then((url) => ({ url, key: "audioFile" }));
      promises.push(result);
    }

    const result = await Promise.all(promises);
    result.reduce((acc, el) => {
      acc[el.key] = el.url;
      return acc;
    }, data);

    await audiobookService.create(data);
    res.status(201).json({ message: "Create successfull" }, data);
  } catch (error) {
    next(error);
  } finally {
    if (req.files.bookImage) {
      fs.unlink(req.files.bookImage[0].path);
    }
    if (req.files.audioFile) {
      fs.unlink(req.files.audioFile[0].path);
    }
  }
};

audiobookController.getAllAudiobook = async (req, res, next) => {
  try {
    const data = await audiobookService.getAllAudiobook();
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

module.exports = audiobookController;
