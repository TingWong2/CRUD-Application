import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import "../styles/movieDetailPage.css";

const API_URL = "http://localhost:5005";

function MovieDetailPage({img, title, mainActor, genres, description}) {
  const [movie, setMovie] = useState(null);
  // get the URL parameter : `movieId``
  const { movieId } = useParams();
  const nagivate = useNavigate();

  // helper function that make the get request to the API to retrieves the project by the id

  const getMovie = () => {
    axios
      .get(`${API_URL}/api/movies/${movieId}`)
      .then((response) => {
        const oneMovie = response.data;
        console.log("===> DetailPage response.data", response.data);
        setMovie(oneMovie);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getMovie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const deleteMovie = () => {
    // make a delete request to delete the movie
    axios
      .delete(`${API_URL}/api/movies/${movieId}`)
      .then((response) => {
        // Once the delete request is resolved successfully
        // navigate back to the list of projects.
        nagivate("/movies");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="oneMovieWrapper">
      {movie && (
        <>
            <Card
              movieId={movie._id}
              img={movie.imageUrl}
              title={movie.title}
              mainActor={movie.mainActor}
              description={movie.description}
              genres=
               {movie.genre &&
                movie.genres.map((g) => {
                  return (
                    <span className="genre" key={g._id}>
                      {" "}
                      {g.name} {" "}
                    </span>
                  );
                })}
            /> 
        
        </>
      )}
      <div className="buttonLink">
        <Link to="/movies">
          <button>Back to movies</button>
        </Link>
        <Link to={`/movies/edit/${movieId}`}>
          <button>Edit movie</button>
        </Link>

        <button onClick={deleteMovie}>Delete</button>
      </div>
    </div>
  );
}

export default MovieDetailPage;
