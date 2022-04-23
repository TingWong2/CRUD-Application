import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Container, Button } from "react-bootstrap";
import "../styles/addMoviePage.css";

const API_URL = "http://localhost:5005";

function UpdateMoviePage(props) {
  const [movie, setMovie] = useState({
    title: "",
    description: "",
    mainActor: "",
    genres: [],
    imageUrl: "",
  });

  const { movieId } = useParams();
  //* Using the React Router’s useParams() hook we retrieve the projectId parameter from the URL: */
  const imageRef = useRef("");
  //* useRef is like a “box” that can hold a mutable value in its .current property.
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();
  const [checkedGenre, setcheckedGenre] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/movies/${movieId}`)
      .then((response) => {
        const oneMovie = response.data;
        //console.log("===> oneMovie", oneMovie);
        //console.log('useparams contient : ', useParamsContent)
        //console.log('movieId  : ', movieId)
        setMovie(oneMovie);
        setcheckedGenre(oneMovie.genres.map((genre) => genre._id));
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${API_URL}/api/genres`)
      .then((response) => {
        const foundGenres = response.data;
        setGenres(foundGenres);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [movieId]);
  console.log("movie in updateMoviePage : ", movie);

  //*** Display the selected genres checkboxes  */
  function isChecked(genreId) {
    console.log("===>update genreId", genreId);
    console.log("+++movie.genres", movie.genres);
    console.log("checkedGenre", checkedGenre);

    const someResult = checkedGenre.some((g) => {
      return g === genreId;
    });
    console.log("result", someResult);
    return someResult;
  }

  // *** function handleChange is updating the selecting checkbox in a list
  const handleChange = (genreId) => {
    console.log("@@@@@@ genreId", genreId);

    // Create a new array
    // Check in the new array of the checked genre by id is present in the table
    // The FindIndex() method returns the first index at which a given element can be found in the array,
    // or -1 if it is not present.
    // Splice() method changes the contents of an array by removing if the table already get the same element
    const copy = [...checkedGenre];

    const existingIndex = copy.findIndex((existing) => {
      return existing === genreId;
    });
    //if existingIndex returns -1, indicating that no element passed the test, genre doesnot exist in the table
    if (existingIndex === -1) {
      copy.push(genreId);
    } else {
      //splice(start, deleteCount)
      copy.splice(existingIndex, 1);
    }
    setcheckedGenre(copy);
    console.log("@@@@ copy", copy);
  };

  // ******* this method submit the form *******
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, mainActor /*, genres*/ } = movie; // destructuring the state

    const formData = new FormData(); // create a form data => an object to send as post body

    // appending the keys / values pairs to the FormData
    formData.append("title", title); // create a key [title] on the formData
    formData.append("description", description);
    formData.append("mainActor", mainActor);

    for (var i = 0; i < checkedGenre.length; i++) {
      formData.append("genres[]", checkedGenre[i]);
    }

    // console.log("genres array", genres);
    // last: accessing the image out of the ref ...
    formData.append("imageUrl", imageRef.current.files[0]); // target the image file associated to the input[type=file]

    console.log("------ FORM DATA -----");
    console.log(formData); // <= this looks like a empty object

    //*** creating new one with the PUT request that will allow us to update an existing movie */
    try {
      console.log("formData", formData);

      const response = await axios.put(
        `${API_URL}/api/movies/${movieId}`,
        formData
      );

      console.log("Creating a updated movie", response.data);

      navigate("/movies");
    } catch (error) {
      console.log("Error when adding the new movie", error);
    }
  };

  return (
    <div className="editMoviePage">
      <Container fluid>
        <Form className="updateMoviePage">
          <Form.Group className="mb-3">
            <Form.Label htmlFor="title">Title:</Form.Label>
            <Form.Control
              type="text"
              name="title"
              id="title"
              value={movie.title}
              onChange={(e) => setMovie({ ...movie, title: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="description">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              // type="textarea"
              name="description"
              id="description"
              value={movie.description}
              onChange={(e) =>
                setMovie({ ...movie, description: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="mainActor"></Form.Label>
            <Form.Control
              type="text"
              name="mainActor"
              id="mainActor"
              value={movie.mainActor}
              onChange={(e) =>
                setMovie({ ...movie, mainActor: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <div className="checkboxes">
              {genres.map((genre, index) => {
                return (
                  <div key={genre._id}>
                    <input
                      //key={genre._id}
                      type="checkbox"
                      id={index}
                      name={genre.name}
                      checked={isChecked(genre._id)}
                      // {...genre.name===movie.genres[0].name && "checked" === "true"}
                      value={genre._id}
                      onChange={() => handleChange(genre._id)}
                    />
                    <label htmlFor={index}>{genre.name}</label>
                  </div>
                );
              })}
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="file"
              name="imageUrl"
              ref={imageRef}
              onChange={(e) => {
                setMovie({ ...movie, imageUrl: e.target.files[0] });
              }}
            />
          </Form.Group>
          <Form.Group id="image">
            <img src={movie.imageUrl} alt="movie" />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="secondary" size="lg" onClick={handleSubmit}>
              Update this movie
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default UpdateMoviePage;
