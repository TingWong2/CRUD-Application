const router = require("express").Router();
const mongoose = require("mongoose");
const Movie = require("./../models/Movie.model");
const Genre = require("./../models/Genre.model");
const fileUploader = require("./../config/cloudinary.config");

// POST create a new genre
router.post("/genres", (req, res, next) => {
  Genre.create(req.body)
    .then((dbResponse) => res.json(dbResponse))
    .catch((error) => res.json(error));
});

// GET /api/genres - Retrieves all the genres
router.get("/genres", (req, res, next) => {
  //**** We use the Genre model to operate on the collection of the movies
  //**** Calling the find() method we retrieve all of the documents from the genres collection.
  Genre.find()
    //**** We send the retrieved genre documents as a JSON: res.json(allGenres)
    .then((allgenres) => {
      res.status(200).json(allgenres);
    })
    // **** catch() deals with errors.
    .catch((error) => {
      res.json(error);
    });
});

// GET /api/movies/:movieId - Retrieves a specific movie by Id
router.get("/genres/:genreId", (req, res, next) => {
  const { genreId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(genreId)) {
    res.status(400).json({ message: "Specified ID is not valid" });
    return;
  }
  Genre.findById(genreId)
    .then((genre) => res.status(200).json(genre))
    .catch((error) => res.json(error));
});

//******  PUT/movies/:movieId - Update a specific movie by id ******

router.put("/genres/:genreId", (req, res, next) => {
  const { genreId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(genreId)) {
    res.status(400).json({ message: "Specified ID is not valid" });
    return;
  }

  Genre.findByIdAndUpdate(genreId, req.body, { new: true })
    .then((updatedGenre) => res.status(204).json(updatedGenre))
    .catch((error) => res.json(error));
});

// ******  DELETE /api/movies/:movieId - Delete a specific movie by Id ******
router.delete("/genres/:genreId", (req, res, next) => {
  const { genreId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(genreId)) {
    res.status(400).json({ message: "Specified ID is not valid" });
    return;
  }

  Genre.findByIdAndDelete(genreId).then(() =>
    res.json({ message: `Genre with ${genreId} is removed successfully!` })
  );
});

module.exports = router;
