const express = require("express");
const applyMiddleware = require("./middleware/applyMiddleware");
const connectDB = require("./db/connectDB");
require("dotenv").config();
const app = express();

const authenticationRoutes = require("./routes/authentication/index");
const propertyRoutes = require("./routes/property");
const instagramRoutes = require("./routes/instagram");
const userRoutes = require("./routes/user");
const reviewRoutes = require("./routes/review");
const wishlistRoutes = require("./routes/wishlist");
const boughtRoutes = require("./routes/bought");
const paymentRoutes = require("./routes/payment");

applyMiddleware(app);

app.use(authenticationRoutes);
app.use(propertyRoutes);
app.use(instagramRoutes);
app.use(userRoutes);
app.use(reviewRoutes);
app.use(wishlistRoutes);
app.use(boughtRoutes);
app.use(paymentRoutes);

app.get("/health", (req, res) => {
  res.send("Dream Forge in running");
});

app.all("*", (req, res, next) => {
  const error = new Error(`The requested url is invalid: [${req.url}]`);
  error.status = 404;

  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = app;
