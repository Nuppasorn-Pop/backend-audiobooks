const express = require("express");
const favoriteController = require("../controller/favorite-controller");
const favoriteRouter = express.Router();

favoriteRouter.post("/:audiobookId", favoriteController.addFavorite);
favoriteRouter.delete("/:favoriteId", favoriteController.unFavorite);
favoriteRouter.get("/", favoriteController.getMyAllFavorite);
favoriteRouter.get(
  "/:audiobookId",
  favoriteController.getFavByUserIdAndAudiobookId
);
module.exports = favoriteRouter;
