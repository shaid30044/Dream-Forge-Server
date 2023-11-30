const Instagram = require("../../model/Instagram");
const router = require("express").Router();

router.get("/instagram", async (req, res) => {
  const result = await Instagram.find();
  res.send(result);
});

module.exports = router;
