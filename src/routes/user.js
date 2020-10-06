const router = require("express").Router();
import User from "../controllers/User";
import checkUserIsAuthenticated from "../middlewares/checkUserIsAuthenticated";
import checkThatNumberIsNotVerified from "../middlewares/checkIfNumberIsAlreadyVerified";
import { uploadImage } from "../middlewares/imageUpload";
// import checkIsValidUser from '../middlewares/checkIsValidUser';
import checkUserIsAdmin from "../middlewares/checkUserIsAdmin";

import {
  validateRegistrationCredentials,
  validateSignInCredentials,
  validateUserPatchModification,
  validateEmailOnRequest,
  validateChangePassword,
} from "../middlewares/validateRequests";

const {
  registerUser,
  login,
  getUserByUsername,
  getUserByEmail,
  validateToken,
  requestAChangeOfPassword,
  changePassword,
  validateEmail,
  sendVerificationCode,
  uploadUserImage,
  modifyUser
} = User;

router.route("/profile")
.get(checkUserIsAuthenticated, getUserByUsername)
.put(checkUserIsAuthenticated, modifyUser)
router.post("/signup", validateRegistrationCredentials, registerUser);
router.post("/login", validateSignInCredentials, login);
router.get("/validate/:id", validateEmail);
router.post(
  "/send-code",
  checkUserIsAuthenticated,
  checkThatNumberIsNotVerified,
  sendVerificationCode
);
router.post("/reset", validateEmailOnRequest, requestAChangeOfPassword);
router.put("/reset", checkUserIsAuthenticated,validateChangePassword, changePassword);
router.get("/token/validate", checkUserIsAuthenticated, validateToken);
router.get("/username", checkUserIsAuthenticated, getUserByUsername);
router.patch("/image/upload",checkUserIsAuthenticated, uploadImage("image"), uploadUserImage)

module.exports = router;
