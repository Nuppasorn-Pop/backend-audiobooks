const favoriteService = require("../services/favorite-service");
const createError = require("../utils/create-error");

const favoriteController = {};
favoriteController.addFavorite = async (req, res, next) => {
  try {
    const data = {};
    data.userId = req.user.id;
    data.audiobookId = +req.params.audiobookId;

    const isExitsFavorite =
      await favoriteService.findFavoriteByUserIdAndAudiobookId(
        data.userId,
        data.audiobookId
      );
    if (isExitsFavorite) {
      createError({
        message: "This audiobook is already in your shelf",
        statusCode: 400,
      });
    }

    await favoriteService.create({ data });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
favoriteController.unFavorite = async (req, res, next) => {
  try {
    const isExitsFavorite = await favoriteService.findFavoriteId(
      +req.params.favoriteId
    );
    if (!isExitsFavorite) {
      createError({
        message: "Can not delete, this audiobook is not in your shelf",
        statusCode: 400,
      });
    }

    await favoriteService.delete(+req.params.favoriteId);
    res.status(204).json({});
  } catch (error) {
    next(error);
  }
};
favoriteController.getMyAllFavorite = async (req, res, next) => {
  try {
    const data = await favoriteService.getAllFavoriteByUserId(req.user.id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

favoriteController.getFavByUserIdAndAudiobookId = async (req, res, next) => {
  try {
    const data = await favoriteService.findFavoriteByUserIdAndAudiobookId(
      req.user.id,
      +req.params.audiobookId
    );
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
module.exports = favoriteController;
