import bcrypt from "bcrypt";
import user from "../models/User";
import newUserMail from "../utils/mail-templates/newUserMail";
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
      return res.status(500).json({ message: 'An error occur', error });
    }
  }
}
