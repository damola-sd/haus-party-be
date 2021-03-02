const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const getPaymentSecret = (req, res, next) => {
  const amount = req.body.amount;
  const currency = req.body.currency;

  stripe.paymentIntents
    .create({ amount, currency })
    .then((intent) => res.json({ secret: intent["client_secret"] }))
    .catch(next);
};
