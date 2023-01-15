const mongoose = require("mongoose");

const RegistrationForm = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
});

const RegistrationModel = mongoose.model("user", RegistrationForm);

module.exports = {
  RegistrationModel,
};
