const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const gameDataSchema = new Schema(
  {
    gameFeedBack: { type: Array },
    child: { type: Number },
  },
  {
    timestamps: true,
  }
);

const GameData = mongoose.model("GameData", gameDataSchema);

module.exports = GameData;
