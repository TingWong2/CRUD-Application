require("dotenv").config();
require("../../config/mongo");
const MovieModel = require("../../models/Movie.model");
const GenreModel = require("../../models/Genre.model");

(async function insertMovies() {
  try {
    // empty the tags database collection
    await MovieModel.deleteMany();
    await GenreModel.deleteMany();
    // create all genres in the database
    const genres = [
      { name: "drama" },
      { name: "action" },
      { name: "comedy" },
      { name: "fantasy" },
      { name: "horror" },
      { name: "adventure" },
      { name: "mystery" },
      { name: "romance" },
      { name: "crime" },
      { name: "fiction" },
      { name: "science" },
      { name: "western" },
    ];
    const genreInDatabase = await GenreModel.create(genres);
    // get access to genre objectId from genreInDatabase

    const dramaObjectId = genreInDatabase[0]._id;
    const actionObjectId = genreInDatabase[1]._id;
    const comedyObjectId = genreInDatabase[2]._id;
    const fantasyObjectId = genreInDatabase[3]._id;
    const horrorObjectId = genreInDatabase[4]._id;
    const adventureObjectId = genreInDatabase[5]._id;
    const mysteryObjectId = genreInDatabase[6]._id;
    const romanceObjectId = genreInDatabase[7]._id;
    const crimeObjectId = genreInDatabase[8]._id;
    const fictionObjectId = genreInDatabase[9]._id;
    const scienceObjectId = genreInDatabase[10]._id;
    const westernObjectId = genreInDatabase[11]._id;

    // use genre objectId and create a list of movies
    const movies = [
      {
        title: "The Wolf of Wall Street",
        description:
          "A New York stockbroker refuses to cooperate in a large securities fraud case involving corruption on Wall Street, corporate banking world and mob infiltration. Based on Jordan Belfort's autobiography.",
        mainActor: "Leonardo DiCaprio",
        genres: [crimeObjectId, dramaObjectId, comedyObjectId],
        imageUrl:
          "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/pWHf4khOloNVfCxscsXFj3jj6gP.jpg",
      },

      {
        title: "The Revenant",
        description:
          " In the 1820s, a frontiersman, Hugh Glass, sets out on a path of vengeance against those who left him for dead after a bear mauling.",
        mainActor: "Leonardo DiCaprio",
        genres: [westernObjectId, dramaObjectId, adventureObjectId],
        imageUrl:
          "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ji3ecJphATlVgWNY0B0RVXZizdf.jpg",
      },

      {
        title: "Matrix",
        description:
          "Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth. ",
        mainActor: "Keanu Reeves",
        genres: [actionObjectId, scienceObjectId, fictionObjectId],
        imageUrl:
          "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/pEoqbqtLc4CcwDUDqxmEDSWpWTZ.jpg ",
      },

      {
        title: "Catch Me If You Can",
        description:
          "A true story about Frank Abagnale Jr. who, before his 19th birthday, successfully conned millions of dollars worth of checks as a Pan Am pilot, doctor, and legal prosecutor. An FBI agent makes it his mission to put him behind bars. But Frank not only eludes capture, he revels in the pursuit. ",
        mainActor: "Tom Hanks",
        genres: [dramaObjectId, crimeObjectId],
        imageUrl:
          "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/gvOnGxfTWbUVdXWBFpbWwkKt95I.jpg",
      },
      {
        title: "The Curious Case of Benjamin Button",
        description:
          "I was born under unusual circumstances. And so begins The Curious Case of Benjamin Button, adapted from the 1920s story by F. Scott Fitzgerald about a man who is born in his eighties and ages backwards: a man, like any of us, who is unable to stop time. We follow his story, set in New Orleans, from the end of World War I in 1918 into the 21st century, following his journey that is as unusual as any man's life can be. Benjamin Button, is a grand tale of a not-so-ordinary man and the people and places he discovers along the way, the loves he finds, the joys of life and the sadness of death, and what lasts beyond time.",
        mainActor: " ",
        genres: [dramaObjectId, fantasyObjectId, romanceObjectId],
        imageUrl:
          "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/26wEWZYt6yJkwRVkjcbwJEFh9IS.jpg",
      },

      /* {
        title: " ",
        description: " ",
        mainActor: " ",
        genres: [" ", " ", " "],
        imageUrl: " ",
      },
      
      */
    ];

    // insert all movies in database

    const moviesInserted = await MovieModel.insertMany(movies);
    console.log("Movies", movies);
    console.log(
      `seed users done : ${moviesInserted.length} documents inserted !`
    );
    process.exit();
  } catch (error) {
    console.log(error);
  }
})();
