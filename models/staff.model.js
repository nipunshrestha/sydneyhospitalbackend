const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const staffSchema = new Schema(
  {
    _id: { type: Number, required: true },
    userEmail: { type: String, required: true, trim: true, minlength: 3 },
    password: { type: String, required: true, minlength: 3, trim: true },
  },
  {
    timestamps: true,
  }
);

const Staff = mongoose.model("Staff", staffSchema);

module.exports = Staff;
