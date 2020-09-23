import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from '../config/constants';
const stripe = new Stripe(STRIPE_SECRET_KEY);

class Transaction {
    
    static async charge(req, res) {

    }
}