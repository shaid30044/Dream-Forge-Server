const { model, Schema } = require("mongoose");

const ReviewSchema = new Schema({
  propertyTitle: String,
  reviewId: String,
  reviewerName: String,
  reviewerEmail: String,
  reviewerImage: String,
  reviewDescription: String,
  agentName: String,
  reviewTime: String,
});

const Review = model("Review", ReviewSchema);

module.exports = Review;
