const { prisma } = require("../prisma/prisma");

const favoriteService = {};

favoriteService.create = (data) => prisma.favorite.create(data);
favoriteService.delete = (favoriteId) =>
  prisma.favorite.delete({
    where: {
      id: favoriteId,
    },
  });
favoriteService.getAllFavoriteByUserId = (userId) =>
  prisma.favorite.findMany({
    where: { userId: userId },
    include: {
      audiobook: {
        select: {
          title: true,
          bookImage: true,
          author: true,
          createdAt: true,
        },
      },
    },
  });
favoriteService.findFavoriteByUserIdAndAudiobookId = (userId, audiobookId) =>
  prisma.favorite.findFirst({
    where: { userId, audiobookId },
  });
favoriteService.findFavoriteId = (id) => prisma.favorite.findFirst(id);

module.exports = favoriteService;
