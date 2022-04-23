const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// * We’re defining a model called Movie as a constructor function that creates objects with a field
// * title, description , mainActor properties both as type String and
// * genres property being an array of ObjectIds referencing the Genre model.
// * Mongo will automatically add an auto-generated unique _id field, so we don’t need to specify it.

// * The collection name will be created based on the model that represents the blueprint of all the documents
// * that will be stored in that collection.

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

// * Each movie will hold a reference to one or more genres coming from another collection,
//* so let’s create the model for that collection.
