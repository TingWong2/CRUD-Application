const mongoose = require("mongoose");
const { Schema, model } = mongoose;

//We’re defining a model called Movie as a constructor function that creates objects with a field of name,
//that has a type of String.

//The collection name will be created based on the model that represents the blueprint of all the documents
// that will be stored in that collection.
const movieSchema = new Schema(
  {
    title: String,
    description: String,
    mainActor: String,
    genres: [
      {
        type: Schema.Types.ObjectId,
        ref: "Genre",
      },
    ],
    imageUrl: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Movie", movieSchema);
