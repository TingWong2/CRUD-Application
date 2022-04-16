import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Container, Row, Col } from "react-bootstrap";
import "../App.css";

const API_URL = " http://localhost:5005";

function MoviesListPage() {
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
    <div>
      <h1 className="movieList">Movie List </h1>
      <Container fluid>
        {/* connect the nested Form componnent 
    We are going to display the from component AddProject inside of the MoviesListPage. 
    This way we can create new movies from the same page. We will AddMovie component by passing it 
    a callback function from the parent component MoviesListPage, through props.*/}
        {/* <AddMovie refreshMovie={getAllMovies}/> */}
        <Row xs={1} md={3} lg={5} className="g-4">
          {movies.map((movie) => {
            return (
              <div key={movie._id}>
                <Col>
                  <Card>
                    <Card.Img
                      src={movie.imageUrl}
                      alt="movie"
                      // style={{ height: "300px" }}
                    />
                    <Card.Body>
                      <Card.Title>
                        <Link to={`/movies/${movie._id}`}>
                          <h3>{movie.title}</h3>
                        </Link>
                      </Card.Title>
                      <Card.Text>
                        {/* <p>description: {movie.description}</p> */}
                        <p>main actor: {movie.mainActor}</p>
                        <p>
                          genres:
                          {movie.genres &&
                            movie.genres.map((g) => {
                              return (
                                <span key={g._id}>
                                  {" "}
                                  {g.name} {""}
                                </span>
                              );
                            })}
                        </p>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </div>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default MoviesListPage;
