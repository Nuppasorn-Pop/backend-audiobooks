const express = require("express");
const audiobookController = require("../controller/audiobook-controller");
const { createAudiobookValidator } = require("../middleware/validator");
const upload = require("../middleware/upload");
const adminAuthenticate = require("../middleware/admin-authenticate");
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

audiobookRouter.get("/myShelf", audiobookController.getMyAudiobook);

audiobookRouter.get(
  "/:audiobookId",
  audiobookController.getOneAudiobookByAudiobookId
);

audiobookRouter.delete(
  "/:audiobookId",
  adminAuthenticate,
  audiobookController.deleteMyAudiobook
);

audiobookRouter.patch(
  "/:audiobookId",
  adminAuthenticate,
  audiobookController.approveAudiobook
);

audiobookRouter.delete(
  "/:audiobookId/reject",
  audiobookController.rejectAudiobook
);

module.exports = audiobookRouter;
