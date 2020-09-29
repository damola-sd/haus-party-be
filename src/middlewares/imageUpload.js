const cloudinary = require("cloudinary");
const multer = require("multer");
const storage = require("../config/cloudinary");

module.exports = {
  uploadImage(image) {
    const parser = multer({ storage });
    return parser.single(image);
  },
  async deleteProfileImage(req, res, next) {
      
  }
};
