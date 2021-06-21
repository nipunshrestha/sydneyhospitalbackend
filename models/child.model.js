const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const childSchema = new Schema({
  _id: { type: Number, required: true, trim: true },
  last_name: { type: String, required: true, trim: true, minlength: 3 },
  date_of_birth: { type: String, trim: true },
  childReward: { type: Array },
  parentReward: { type: Array },
});

const Child = mongoose.model("Child", childSchema);

module.exports = Child;
