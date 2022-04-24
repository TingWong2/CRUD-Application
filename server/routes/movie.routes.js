// Top of the file is all dependencies and then after i defined each routes

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// **** require Movie Model and Genre Model in order to use it ****
const Movie = require("./../models/Movie.model");
const Genre = require("./../models/Genre.model");
//****  require fileUploader in order to use it ****
const fileUploader = require("./../config/cloudinary.config");

// ****** Create ******
//* POST /api/movies - create a new movie
router.post(
  // the HTTP verb/method needed to access this page
  "/movies", // the route that a user will type into the URL bar
  fileUploader.single("imageUrl"),
  (req, res, next) => {
    // callback as the second argument
    // res, req are object and contains information about the request, response, such as headers and any data we need
    const imageUrl = req.file?.path || undefined; // req.file.path => provided by cloudinary's response (URL of upload file)
    //si l'objet imbriqué existe je veux le path
    console.log("@ image", imageUrl);

    // Mongoose’s create() is sending a MongoDB create command to the DataBase
    Movie.create({
      ...req.body,
      imageUrl,
    })
      .then((newMovie) => {
        res.status(201).json(newMovie); // sending the view to the client
      })
      .catch((error) => {
        res.json(error);
      });
  }
);

// ****** READ ALL ******
//* GET /api/movies - Retrieves all the movies
router.get("/movies", (req, res, next) => {
  Movie.find() //  Mongoose’s find() is sending a MongoDB find command to the database
    .populate("genres") //
    // using a promise
    .then((responseAllMovies) => {
      console.log("here is the BACK response", responseAllMovies);
      res.status(200).json(responseAllMovies);
    })
    .catch((error) => res.json(error));
});

// ****** READ ONE MOVIE ******
//* GET /api/movies/:movieId - Retrieves a specific movie by Id
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
    .populate("genres") // type: Schema.Types.ObjectId, ref: "Genre",
    .then((movie) => res.status(200).json(movie))
    .catch((error) => res.json(error));
});

// ****** UPDATE ******
//* PUT/movies/:movieId - Update a specific movie by id
router.put(
  // the HTTP verb/method needed to access this page
  "/movies/:movieId", // the route that a user will type into the URL bar
  fileUploader.single("imageUrl"),
  async (req, res, next) => {
    // callback as the second argument
    // res, req are object and contains information about the request, response, such as headers and any data we need
    const imageUrl = req.file?.path || undefined;
    //console.log("UPDATE see req.body, req.parmas.id", req.body, req.params);
    // req.file.path => provided by cloudinary's response (URL of upload file)
    const { movieId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      res.status(400).json({ message: "Specific Id is not Valid" });
      return;
    }
    try {
      // Mongoose’s findByIdAndUpdate is sending a MongoDB find command to the database
      const updatedMovie = await Movie.findByIdAndUpdate(
        movieId,
        { ...req.body, imageUrl },
        { new: true } // always return the updated document
      );
      res.status(200).json(updatedMovie); // sending the view to the client
    } catch (error) {
      next(error);
    }
  }
);
// ****** DELETE ******
//* DELETE /api/movies/:movieId - Delete a specific movie by Id
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
