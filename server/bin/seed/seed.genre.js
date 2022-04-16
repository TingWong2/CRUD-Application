require("dotenv").config();
require("./../../config/mongo"); // fetch the db connection
const GenreModel = require("./../../models/Genre.model");
const MovieModel = require("./../../models/Movie.model");

const genres = [
  {
    name: "drama",
  },
  {
    name: "action",
  },
  {
    name: "comedy",
  },
  {
    name: "fantasy",
  },
  {
    name: "horror",
  },
  {
    name: "adventure",
  },
  {
    name: "mystery",
  },
  {
    name: "romance",
  },
  {
    name: "crime",
  },
  {
    name: "fiction",
  },
  {
    name: "science",
  },
  {
    name: "western",
  },
];

/*(async function insertMovieGenre() {
  try {
    await GenreModel.deleteMany(); // empty the styles db collection
    const inserted = await genreSchema.create(genre); // insert docs in db
    console.log("created" + response.length + "genres!");
    process.exit();
  } catch (error) {
    console.error(error);
  }
})();*/

/*GenreModel.deleteMany()
  .then(
    GenreModel.insertMany(genres).then((dbSuccess) => {
      console.log(`SUCCESS ${dbSucess.length} inserted !`);
    })
  )
  .catch((dbErr) => {
    console.log(dbErr);
  });
  */
