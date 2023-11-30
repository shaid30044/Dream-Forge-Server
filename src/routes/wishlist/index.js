const { ObjectId } = require("mongodb");
const verifyToken = require("../../middleware/verifyToken");
const Wishlist = require("../../model/Wishlist");
const router = require("express").Router();

router.get("/wishlist", async (req, res) => {
  const result = await Wishlist.find();
  res.send(result);
});

router.get("/wishlist/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await Wishlist.findOne(query);
  res.send(result);
});

router.post("/wishlist", verifyToken, async (req, res) => {
  const item = req.body;
  const result = await Wishlist.create(item);
  res.send(result);
});

router.delete("/wishlist/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  const queryId = { _id: new ObjectId(id) };
  const result = await Wishlist.deleteOne(queryId);
  res.send(result);
});

module.exports = router;
