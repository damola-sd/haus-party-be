import card from '../models/Card';
const dbQuery = require('../utils/dbQueries');



class Card {

    static async createCard(req, res) {
        try {
            const { cardName, cardNumber, cvv } = req.body;
            const newCard = {
                card_name: cardName,
                card_number: cardNumber,
                cvv,
                owner: req.decoded._id
            }
            const createNewCard = await dbQuery.Create(card, newCard);
            if(!createNewCard){
                res.status(401).json('Could not create new card');
            }
            res.status(200).json({
                message: 'Created new card succesfully'
            })

        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    }

}