const express = require("express");
const audiobookController = require("../controller/audiobook-controller");
const { createAudiobookValidator } = require("../middleware/validator");
const upload = require("../middleware/upload");
const audiobookRouter = express.Router();

audiobookRouter.get("/", audiobookController.getAllAudiobook);
audiobookRouter.post(
  "/",
  upload.fields([
    { name: "bookImage", maxCount: 1 },
    { name: "audioFile", maxCount: 1 },
  ]),
  createAudiobookValidator,
  audiobookController.createAudiobook
);
audiobookRouter.get("/:audiobookId", (req, res, next) => {});
audiobookRouter.delete("/:audiobookId", (req, res, next) => {});

module.exports = audiobookRouter;