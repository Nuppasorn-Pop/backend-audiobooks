const cloudinary = require("../config/cloudinary");

const uploadService = {};

uploadService.upload = async (path) => {
  const { secure_url } = await cloudinary.uploader.upload(path, {
    resource_type: "auto",
  });
  return secure_url;
};

// uploadService.uploadFile = async (file) => {
//   const { secure_url } = await cloudinary.uploader.upload(file, {
//     resource_type: "auto",
//   });
//   return secure_url;
// };

module.exports = uploadService;
