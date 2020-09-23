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

router.route("/profile")
.get(checkUserIsAuthenticated, getUserByEmail);
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


module.exports = router;
