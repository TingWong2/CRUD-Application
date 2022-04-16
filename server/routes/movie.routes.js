const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// **** require Movie Model and Genre Model in order to use it ****
const Movie = require("./../models/Movie.model");
const Genre = require("./../models/Genre.model");
//****  require fileUploader in order to use it ****
const fileUploader = require("./../config/cloudinary.config");

// ****** Create ******

// POST /api/movies - create a new movie
router.post(
  "/movies",
  fileUploader.single("imageUrl"),
  async (req, res, next) => {
    const imageUrl = req.file?.path || undefined;
    //si l'objet imbriqué existe je veux le path
    console.log("@ image", imageUrl);

    try {
      const newMovie = await Movie.create({
        ...req.body,
        imageUrl,
      }); // req.file.path => provided by cloudinary's response (URL of upload file)
      res.status(201).json(newMovie);
    } catch (error) {
      next(error);
    }
  }
);

// ****** READ ******
// GET /api/movies - Retrieves all the movies
router.get("/movies", (req, res, next) => {
  Movie.find()
    .populate("genres")

    .then((responseAllMovies) => {
      console.log("here is the BACK response", responseAllMovies);
      res.status(200).json(responseAllMovies);
    })
    .catch((error) => res.json(error));
});

// GET /api/movies/:movieId - Retrieves a specific movie by Id
router.get("/movies/:movieId", (req, res, next) => {
  const imageUrl = req.file?.path || undefined;
  const { movieId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(movieId)) {
    res.status(400).json({ message: "Specified Id is not valid" });
    return;
  }

  // Each movie has a 'genre' array holding '_id's of genre documents
  // We use populate() method to get swap the actual '_id's for the actual genre documents
  Movie.findById(movieId, req.file)
    .populate("genres")
    .then((movie) => res.status(200).json(movie))
    .catch((error) => res.json(error));
});

// ****** UPDATE ******
// PUT/movies/:movieId - Update a specific movie by id
router.put(
  "/movies/:movieId",
  fileUploader.single("imageUrl"),
  async (req, res, next) => {
    const imageUrl = req.file?.path || undefined;
    //console.log("UPDATE see req.body, req.parmas.id", req.body, req.params);
    const { movieId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      res.status(400).json({ message: "Specific Id is not Valid" });
      return;
    }
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        movieId,
        { ...req.body, imageUrl },
        { new: true }
      );
      res.status(200).json(updatedMovie);
    } catch (error) {
      next(error);
    }
  }
);

// DELETE /api/movies/:movieId - Delete a specific movie by Id
router.delete("/movies/:movieId", (req, res, next) => {
  const { movieId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(movieId)) {
    res.status(400).json({ message: "Specific Id is not Valid" });
    return;
  }

  Movie.findByIdAndDelete(movieId)
    .then((deleteMovie) =>
      res.status(204).json({
        message: `Movie with id number ${movieId} is removed successfully`,
      })
    )
    .catch((error) => res.json(error));
});

module.exports = router;
