const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  name: String,
  email: String,
  photo: String,
  role: String,
});

const User = model("User", UserSchema);

module.exports = User;
