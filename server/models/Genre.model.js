const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const genreSchema = new Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Genre", genreSchema);
