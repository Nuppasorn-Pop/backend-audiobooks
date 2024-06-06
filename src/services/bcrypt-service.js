const bcrypt = require("bcryptjs");
const hashService = {};

hashService.hash = (plainText) => bcrypt.hash(plainText, 10);
hashService.compare = (plainText, hashValue) => {
  const result = bcrypt.compare(plainText, hashValue);
  return result;
};

module.exports = hashService;
