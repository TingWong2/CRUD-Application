require("dotenv").config();
require("../../config/mongo");
const MovieModel = require("../../models/Movie.model");
const GenreModel = require("../../models/Genre.model");

(async () => {
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
  const movies = [
    {
      title: "The Wolf of Wall Street",
      description:
        "A New York stockbroker refuses to cooperate in a large securities fraud case involving corruption on Wall Street, corporate banking world and mob infiltration. Based on Jordan Belfort's autobiography.",
      mainActor: "Leonardo DiCaprio",
      genres: ["crime", "drama", "comedy"],
      imageUrl:
        "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/pWHf4khOloNVfCxscsXFj3jj6gP.jpg",
    },

    {
      title: "The Revenant",
      description:
        " In the 1820s, a frontiersman, Hugh Glass, sets out on a path of vengeance against those who left him for dead after a bear mauling.",
      mainActor: "Leonardo DiCaprio",
      genres: ["western", "drama", "adventure"],
      imageUrl:
        "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ji3ecJphATlVgWNY0B0RVXZizdf.jpg",
    },

    {
      title: "Matrix",
      description:
        "Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth. ",
      mainActor: "Keanu Reeves",
      genres: ["action", "science", "fiction"],
      imageUrl:
        "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/pEoqbqtLc4CcwDUDqxmEDSWpWTZ.jpg ",
    },

    {
      title: "Catch Me If You Can",
      description:
        "A true story about Frank Abagnale Jr. who, before his 19th birthday, successfully conned millions of dollars worth of checks as a Pan Am pilot, doctor, and legal prosecutor. An FBI agent makes it his mission to put him behind bars. But Frank not only eludes capture, he revels in the pursuit. ",
      mainActor: "Tom Hanks",
      genres: ["drama", "crime"],
      imageUrl:
        "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/gvOnGxfTWbUVdXWBFpbWwkKt95I.jpg",
    },
    {
      title: "The Curious Case of Benjamin Button",
      description:
        "I was born under unusual circumstances. And so begins The Curious Case of Benjamin Button, adapted from the 1920s story by F. Scott Fitzgerald about a man who is born in his eighties and ages backwards: a man, like any of us, who is unable to stop time. We follow his story, set in New Orleans, from the end of World War I in 1918 into the 21st century, following his journey that is as unusual as any man's life can be. Benjamin Button, is a grand tale of a not-so-ordinary man and the people and places he discovers along the way, the loves he finds, the joys of life and the sadness of death, and what lasts beyond time.",
      mainActor: " ",
      genres: ["drama", "fantasy", "romance"],
      imageUrl:
        "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/26wEWZYt6yJkwRVkjcbwJEFh9IS.jpg",
    },
  ];

  try {
    await MovieModel.deleteMany();
    await GenreModel.deleteMany();
    const dbGenres = await GenreModel.create(genres);

    movies.forEach((movie) => {
      movie.genres.forEach((genre, i) => {
        const foundGenreObjectIndbGenres = dbGenres.find(
          (currentGenreInDbGenres) => currentGenreInDbGenres.name == genre
        );
        console.log("dbGenres", dbGenres);
        movie.genres[i] = foundGenreObjectIndbGenres._id;
      });
    });

    const dbMovies = await MovieModel.create(movies);
    process.exit();
  } catch (e) {
    console.log(e);
  }
})();
