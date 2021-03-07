import User from '../models/User';


const checkUserIsAdmin = async ({ decoded: { username } }, res, next) => {
  try { 
    User.findOne({ username }, (err, user) => {
      console.log(user)
    });
    console.log(userFound);
    if (!userFound) {
      return res.status(404).json({
        message: 'You do not seem to be registered, please sign up or try again',// eslint-disable-line
      });
    }

    if (userFound.role !== 'admin') {
      return res.status(403).json({
        message: 'You are not authorized to perform this action',
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "An error occurred", error });
  }
};

export default checkUserIsAdmin;
