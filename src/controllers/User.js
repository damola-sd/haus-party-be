import bcrypt from "bcrypt";
import { User as user } from "../models/User";
import newUserMail from "../utils/mail-templates/newUserMail";
import forgotPassword from "../utils/mail-templates/forgotPassword";
import sendMail from "../utils/sendMail";
import createToken from "../utils/createToken";
import { createUser as setUser } from "../utils/createUser";

/**
 * @class User
 * @returns {object} static methods
 */
class User {
  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} response data
   * @memberof User class
   */

  static async registerUser(req, res) {
    try {
      const { email, password, firstName, lastName, role, username } = req.body;
      const hash = await bcrypt.hash(password, 10);
      const createUser = await user.create({
        ...req.body,
        password: hash,
      });
      const data = newUserMail(email, firstName);
      await sendMail(data);

      return res.status(201).json({
        message: "User registered",
        token: createToken(createUser, "30d"),
        user: setUser(createUser),
      });
    } catch (error) {
      return res.status(500).json({
        error,
        message: "An error occurred",
      });
    }
  }
  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} response data
   * @memberof User class
   */

  static async login(req, res, next) {
    try {
      const { email, password, role } = req.body;
      const registeredUser = await user.findOne({ email });
      if (registeredUser) {
        const validPassword = bcrypt.compareSync(
          password,
          registeredUser.password
        );
        if (validPassword) {
          return res.status(200).json({
            message: "Successfully Login",
            token: createToken(registeredUser, "30d"),
            user: setUser(registeredUser),
          });
        }
        return res.status(400).json({
          message: "Invalid email or password",
        });
      }
    } catch (error) {
      return res.status(500).json({ message: "An error occur", error });
    }
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} response data
   * @memberof User class
   */

  static async getUserByUsername(req, res) {
    try {
      const { username } = req.decoded;
      const userDetails = await user.findByUsername(username);
      if (userDetails) {
        return res.status(200).json({
          message: "Request was successful",
          user: userDetails,
        });
      }
      return res.status(404).json({
        message:
          "You do not seem to be registered, please sign up or try again",
      });
    } catch (error) {
      return res.status(500).json({ message: "An error occur", error });
    }
  }
  /**
   *
   *
   * @static
   * @param {object} { params: { slug } }
   * @param {object} res
   * @returns {json} response
   * @memberof User
   */
  static async getUserByEmail({ query: { email } }, res) {
    try {
      const userDetails = await user.findOne({ email });
      if (userDetails) {
        return res.status(200).json({
          message: "Request was successful",
          userInfo: userDetails,
        });
      }
      return res.status(404).json({
        message:
          "You do not seem to be registered, please sign up or try again",
      });
    } catch (error) {
      return res.status(500).json({ message: "An error occur", error });
    }
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} response data
   * @memberof User class
   */
  static async modifyUser(req, res) {
    try {
      const { username } = req.decoded;
      if (req.body.password) {
        const { password } = req.body;
        req.body.password = bcrypt.hashSync(password, 10);
      }
      await user.init();
      const updatedUser = await user.findOneAndUpdate(
        { username },
        { ...req.body },
        { new: true }
      );

      return res.status(200).json({
        message: "User edited successfully",
        updatedUser,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} response data
   * @memberof User class
   */
  static async validateToken(req, res) {
    try {
      const { username } = req.decoded;
      await user.init();
      const foundUser = await user.findByUsername(username);
      if (foundUser) {
        return res.status(200).json({
          message: "You've registered",
        });
      }
      return res.status(404).json({
        message: "You do not seem to be registered",
      });
    } catch (error) {
      return res.status(500).json({ message: "An error occur", error });
    }
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} response data
   * @memberof User class
   */
  static async requestAChangeOfPassword(req, res) {
    try {
      const { email } = req.body;
      const userFound = await user.findOne({ email });

      if (userFound) {
        // 15 minutes - 60seconds * 15
        const token = createToken(userFound, 900);
        const data = forgotPassord(email, baseUrl, token);
        await sendMail(data);
        return res.status(200).json({
          message: "A mail has been sent for your password reset",
        });
      }
      return res.status(404).json({
        message: "An error occur please check your email and try again",
      });
    } catch (error) {
      return res.status(500).json({ message: "An error occur", error });
    }
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} response data
   * @memberof User class
   */
  static async changePassword(req, res) {
    try {
      const {
        decoded: { username },
        body: { password },
      } = req;
      const hash = bcrypt.hashSync(password, 10);
      await user.findOneAndUpdate({ username }, { password: hash });

      return res.status(200).json({
        message: "Password Successfully Changed",
      });
    } catch (error) {
      return res.status(500).json({ message: "An error occurred", error });
    }
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} response data
   * @memberof User class
   */
  static async validateEmail({ params: { id } }, res) {
    try {
      const data = await user.findOne({ email: id });
      if (data) {
        res.status(200).json({
          status: true,
        });
      } else {
        res.status(200).json({
          status: false,
        });
      }
    } catch (error) {
      return res.status(500).json({ message: "An error occurred", error });
    }
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} response data
   * @memberof User class
   */

  static async uploadUserImage(req, res, next) {
    try {
      const { file } = req;
      const { username } = req.decoded;
      await user.init();
      const userProfile = await user.findByUsername(username);
      userProfile.profilePicture = file.secure_url;
      userProfile.imageId = file.public_id;
      userProfile.save().then((response) => {
        res.status(201).json({
          message: `Successfully uploaded user ${username} profile image`,
        });
      });
    } catch (error) {
      return res.status(500).json({ message: "An error occurred", error });
    }
  }

  static async sendVerificationCode(req, res) {
    try {
      const { username } = req.decoded;
      let { phoneNumber } = req.body;
      // contactMobile = parseInt(contactMobile, 10); // remove leading zero

      await user.findOneAndUpdate({ username }, { phoneNumber });

      const verificationRequest = await twilioSetup.verify
        .services(VERIFICATION_SID)
        .verifications.create({
          to: phoneNumber,
          channel: "sms",
        });

      if (!verificationRequest) {
        return res.status(401).json({
          message: "Error occurred while processing request",
          success: false,
        });
      }

      return res.status(200).json({
        message: `a code has been sent to +234${contactMobile}`,
        success: true,
      });
    } catch (error) {
      return res.status(500).json({ message: "An error occurred", error });
    }
  }
}

export default User;
