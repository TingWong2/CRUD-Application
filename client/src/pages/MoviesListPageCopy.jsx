import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";
import "../App.css";

const API_URL = " http://localhost:5005";

function MoviesListPageCopy({ img, title, mainActor, genres }) {
  const [movies, setMovies] = useState([]);

  const getAllMovies = () => {
    axios
      .get(`${API_URL}/api/movies`)
      .then((response) => {
        setMovies(response.data);
        //console.log("====> response data", response.data);
      })
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllMovies();
  }, []);

  return (
    <div className="movieListPage">
      <div className="movieListPageWrapper">
        {/* connect the nested Form componnent 
    We are going to display the from component AddProject inside of the MoviesListPage. 
    This way we can create new movies from the same page. We will AddMovie component by passing it 
    a callback function from the parent component MoviesListPage, through props.*/}
        {/* <AddMovie refreshMovie={getAllMovies}/> */}

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
