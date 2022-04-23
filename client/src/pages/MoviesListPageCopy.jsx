import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";
// import SearchBar from "../components/SearchBar";
import "../App.css";

// *** Display the list of all the movies coming from the mongoDB.
// *** We will create MoviesListPage ****/

const API_URL = " http://localhost:5005";

function MoviesListPageCopy({ img, title, mainActor, genres }) {
  // *  useState hook to create a stateful component that will be storing and displaying a list of movies from the state.
  const [movies, setMovies] = useState([]);

  // * helper function to retrieves all movies
  // * The function getAllMovies makes a GET request using axios to the following backend endpoint
  const getAllMovies = () => {
    axios
      .get(`${API_URL}/api/movies`)
      .then((response) => {
        setMovies(response.data);
        //console.log("====> response data", response.data);
      })
      .catch((error) => console.log(error));
  };

  // * We set this react hook effect, it will run only once, after the initial render
  // * by setting the empty dependency array - []
  useEffect(() => {
    getAllMovies();
  }, []);

  return (
    <div className="movieListPage">
      <div className="movieListPageWrapper">
        {movies.map((movie) => {
          return (
            <div key={movie._id}>
              <Card
                movieId={movie._id}
                img={movie.imageUrl}
                title={movie.title}
                mainActor={movie.mainActor}
                genres={
                  movie.genres &&
                  movie.genres.map((g) => {
                    return (
                      <span key={g._id}>
                        {" "}
                        {g.name} {""}
                      </span>
                    );
                  })
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MoviesListPageCopy;
