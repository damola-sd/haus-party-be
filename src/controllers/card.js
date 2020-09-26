import card from "../models/Card";
import user from "../models/User";

const dbQuery = require("../utils/dbQueries");

class Card {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} response data
   * @memberof Card class
   */
  static async createCard(req, res) {
    try {
      const { cardName, cardNumber, cvv } = req.body;
      const newCard = {
        card_name: cardName,
        card_number: cardNumber,
        cvv,
        owner: req.decoded.id,
      };
      const createNewCard = await dbQuery.Create(card, newCard);
      if (!createNewCard) {
        res.status(401).json("Could not create new card");
      }
      res.status(200).json({
        message: "Created new card succesfully",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} response data
   * @memberof Card class
   */
  static async makeCardDefaultCard(req, res) {
    try {
      const { id } = req.params;
      const checkCard = await card.findById(id);
      if (!checkCard) {
        res.status(404).json({ message: "Could not find the card" });
      }
      const userInfo = await user.findByUsername(req.decoded.username);
      if (userInfo._id === checkCard.owner) {
        userInfo.defaultCard = checkCard._id;
        userInfo
          .save()
          .then((response) =>
            res
              .status(201)
              .json({ message: "Successfully changed default card" })
          );
      }
      return res.status(403).json({
        message: "Card doesn't belong to you. Access denied",
      });
    } catch (error) {
      return res.status(500).json({ message: err.message });
    }
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} response data
   * @memberof Card class
   */

  static async fetchAllUserCard({ decoded: { id, username } }, res) {
    try {
      const allUserCards = await card.find({ owner: id });
      if (allUserCards) {
        return res.status(200).json({
          message: `Fetched all cards belonging to ${username}`,
          data: allUserCards,
        });
      }
      return res.status(204).json({
        message: "No cards belonging to this user",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message
      })
    }
  }
}
