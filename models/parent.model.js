const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const parentSchema = new Schema({
  name: { type: String, required: true, trim: true, minlength: 3 },
  patienceID: { type: Number },
  questions: { type: String },
});

const Parent = mongoose.model("Parent", parentSchema);

module.exports = Parent;
