const router = require('express').Router();
const Auth = require('../controllers/auth');


router.post("/register", Auth.Register);
router.post("/login", Auth.Login);
router.get("verify/:_id", Auth.VerifyAccount);
router.post("/forgotPassword", Auth.ForgotPassword);
router.put("/reset-password/:token", Auth.ResetPassword);




module.exports = router
