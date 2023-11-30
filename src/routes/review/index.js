const { ObjectId } = require("mongodb");
const verifyToken = require("../../middleware/verifyToken");
const Review = require("../../model/Review");
const router = require("express").Router();

router.get("/review", async (req, res) => {
  const result = await Review.find();

  res.send(result);
});

router.post("/review", verifyToken, async (req, res) => {
  const item = req.body;
  const result = await Review.create(item);

  res.send(result);
});

router.delete("/review/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  const queryId = { _id: new ObjectId(id) };
  const result = await Review.deleteOne(queryId);

  res.send(result);
});

module.exports = router;
