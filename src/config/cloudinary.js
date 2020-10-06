const cloudinary = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
import {
  cloudinaryName,
  cloudinaryApiKey,
  cloudinaryApiSecret,
} from "./constants";

cloudinary.config({
  cloud_name: cloudinaryName,
  api_key: cloudinaryApiKey,
  api_secret: cloudinaryApiSecret,
});

const storage = new CloudinaryStorage({
  cloudinary,
  folder: "hausparty",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 500, height: 500, crop: "fill" }],
});

module.exports = storage;
