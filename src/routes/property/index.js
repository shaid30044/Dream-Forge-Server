const { ObjectId } = require("mongodb");
const Property = require("../../model/Property");
const verifyToken = require("../../middleware/verifyToken");
const router = require("express").Router();

router.get("/property", async (req, res) => {
  const result = await Property.find();

  res.send(result);
});

router.get("/property/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await Property.findOne(query);

  res.send(result);
});

router.post("/property", verifyToken, async (req, res) => {
  const item = req.body;
  const result = await Property.create(item);

  res.send(result);
});

router.patch("/property/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const updateDoc = req.body;
  const result = await Property.updateOne(filter, updateDoc);

  res.send(result);
});

router.delete("/property/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  const queryId = { _id: new ObjectId(id) };
  const result = await Property.deleteOne(queryId);

  res.send(result);
});

module.exports = router;
