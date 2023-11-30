const { ObjectId } = require("mongodb");
const verifyToken = require("../../middleware/verifyToken");
const User = require("../../model/User");
const router = require("express").Router();

router.get("/user", async (req, res) => {
  const result = await User.find();
  res.send(result);
});

router.post("/user", async (req, res) => {
  const user = req.body;
  const query = { email: user.email };
  const existingUser = await User.findOne(query);

  if (existingUser) {
    return res.send({ message: "User already exist.", insertedId: null });
  }

  const result = await User.create(user);
  res.send(result);
});

router.patch("/user/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const updateDoc = req.body;
  const result = await User.updateOne(filter, updateDoc);
  res.send(result);
});

router.delete("/user/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  const queryId = { _id: new ObjectId(id) };
  const result = await User.deleteOne(queryId);
  res.send(result);
});

router.get("/user/agent/:email", async (req, res) => {
  const email = req.params.email;

  const query = { email: email };
  const user = await User.findOne(query);
  let agent = false;
  if (user) {
    agent = user?.role === "agent";
  }

  res.send({ agent });
});

router.patch("/user/agent/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const updateDoc = {
    $set: {
      role: "agent",
    },
  };
  const result = await User.updateOne(filter, updateDoc);

  res.send(result);
});

router.get("/user/admin/:email", async (req, res) => {
  const email = req.params.email;

  const query = { email: email };
  const user = await User.findOne(query);
  let admin = false;
  if (user) {
    admin = user?.role === "admin";
  }

  res.send({ admin });
});

router.patch("/user/admin/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const updateDoc = {
    $set: {
      role: "admin",
    },
  };
  const result = await User.updateOne(filter, updateDoc);

  res.send(result);
});

module.exports = router;
