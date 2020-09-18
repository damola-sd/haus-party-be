import user from '../models/User';

const checkThatNumberIsNotVerified = async (req, res, next) => {
  try {
    const { username } = req.decoded;
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

    next();
  } catch (error) {
    return res.status(500).json({ message: "An error occurred", error });
  }
};

export default checkThatNumberIsNotVerified;
