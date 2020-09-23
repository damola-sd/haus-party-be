const router = require("express").Router();
import User from "../controllers/User";
import checkUserIsAuthenticated from "../middlewares/checkUserIsAuthenticated";
import checkThatNumberIsNotVerified from "../middlewares/checkIfNumberIsAlreadyVerified";

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
} = User;

router.post("/signup", validateRegistrationCredentials, registerUser);
router.post("/login", validateSignInCredentials, login);
router.get("/validate/:id", validateEmail);
router.post(
  "/send-code",
  checkUserIsAuthenticated,
  checkThatNumberIsNotVerified,
  sendVerificationCode
);


module.exports = router;
