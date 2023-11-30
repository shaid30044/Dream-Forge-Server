const { ObjectId } = require("mongodb");
const verifyToken = require("../../middleware/verifyToken");
const Bought = require("../../model/Bought");
const router = require("express").Router();

router.get("/bought", async (req, res) => {
  const result = await Bought.find();

  res.send(result);
});

router.get("/bought/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await Bought.findOne(query);

  res.send(result);
});

router.post("/bought", verifyToken, async (req, res) => {
  const item = req.body;
  const result = await Bought.create(item);

  res.send(result);
});

router.patch("/bought/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const { status } = req.body;
  const updateDoc = {
    $set: {
      status: status,
    },
  };
  const result = await Bought.updateOne(filter, updateDoc);

  res.send(result);
});

module.exports = router;
