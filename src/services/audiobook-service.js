const { prisma } = require("../prisma/prisma");

const audiobookService = {};

audiobookService.getAllAudiobook = () =>
  prisma.audiobook.findMany({
    include: {
      user: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });
audiobookService.create = (data) => prisma.audiobook.create({ data });

audiobookService.findAudiobookByTitle = (title) =>
  prisma.audiobook.findFirst({
    where: { title: title },
  });

audiobookService.getOneAudiobookByAudiobookId = (audiobookId) =>
  prisma.audiobook.findFirst({
    where: { id: audiobookId },
    include: {
      user: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });
audiobookService.getMyAudiobookByUserId = (userId) =>
  prisma.audiobook.findMany({
    where: { userId: userId },
  });
audiobookService.acceptStatusAudiobook = (status, audiobookId) =>
  prisma.audiobook.update({
    data: { status },
    where: {
      id: audiobookId,
    },
  });

audiobookService.findAudiobookByAudiobookIdAndStatus = (audiobookId, status) =>
  prisma.audiobook.findFirst({ where: { id: audiobookId, status: status } });

audiobookService.deleteAudiobook = (audiobookId) =>
  prisma.audiobook.delete({ where: { id: audiobookId } });

module.exports = audiobookService;
