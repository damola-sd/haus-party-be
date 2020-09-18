import twilio from 'twilio';
import user from '../models/User';
// import errorHandler from '../helpers/errorHandler';

// SETUP: twilio with required params
import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, VERIFICATION_SID } from '../config/constants';
const twilioSetup = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const twilioVerification = async (req, res, next) => {
  try {
    const { username } = req.decoded;
    const { code } = req.body;
    const foundUser = await user.findByUsername(username);
    if (!foundUser) {
      return res.status(404).json({
        // eslint-disable-next-line max-len
        message: 'You do not seem to be registered, please sign up or try again', // prettier-ignore
      });
    }

    if (foundUser.verified) {
      return res.status(401).json({
        message: 'Your number has already been verified',
      });
    }

    const verificationResult = await twilioSetup.verify
      .services(VERIFICATION_SID)
      .verificationChecks.create({
        code,
        to: foundUser.phoneNumber,
      });

    const { status } = verificationResult;

    if (status !== 'approved') {
      return res.status(404).json({
        message: 'invalid code entered',
        success: false,
      });
    }

    const updatedUser = await user.findOneAndUpdate(
      { username }, { verified: true }, { new: true },
    );

    // store user detail in req object
    req.userDetail = updatedUser;

    next();
  } catch (error) {
    return res.status(500).json({ message: "An error occurred", error });
  }
};

export default twilioVerification;
