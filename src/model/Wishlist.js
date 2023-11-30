const { model, Schema } = require("mongoose");

const WishlistSchema = new Schema({
  wishlistId: String,
  propertyImage: String,
  propertyTitle: String,
  propertyLocation: String,
  agentEmail: String,
  agentName: String,
  agentImage: String,
  verificationStatus: String,
  minPrice: String,
  maxPrice: String,
  buyerEmail: String,
  buyerName: String,
});

const Wishlist = model("Wishlist", WishlistSchema);

module.exports = Wishlist;
