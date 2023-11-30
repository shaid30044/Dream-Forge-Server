const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const verifyToken = require("../../middleware/verifyToken");
const Payment = require("../../model/Payment");
const router = require("express").Router();

router.get("/payments", async (req, res) => {
  const result = await Payment.find();
  res.send(result);
});

router.post("/create-payment-intent", verifyToken, async (req, res) => {
  const { price } = req.body;
  const amount = parseInt(price * 100);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

router.post("/payments", verifyToken, async (req, res) => {
  const payment = req.body;
  const paymentResult = await Payment.create(payment);
  res.send(paymentResult);
});

module.exports = router;
