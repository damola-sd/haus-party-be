import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from '../config/constants';
const stripe = new Stripe(STRIPE_SECRET_KEY);

class Transaction {
    



    static async getPaymentSecret (req, res, next) {
        const amount = req.body.amount;
        const currency = req.body.currency;
      
        stripe.paymentIntents
          .create({ amount, currency })
          .then((intent) => res.json({ secret: intent["client_secret"] }))
          .catch(next);
      };
      
    static async charge(req, res) {
        
    }
}