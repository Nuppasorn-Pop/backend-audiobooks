const { prisma } = require("../prisma/prisma");

const audiobookService = {};

audiobookService.getAllAudiobook = () => prisma.audiobook.findMany();
audiobookService.create = (data) => prisma.audiobook.create({ data });
audiobookService.findAudiobookByTitle = (title) =>
  prisma.audiobook.findFirst({
    where: { title: title },
  });

module.exports = audiobookService;
