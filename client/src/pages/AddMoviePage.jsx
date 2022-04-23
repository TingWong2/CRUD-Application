import React, { useEffect } from "react";
import axios from "axios";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Container, Button } from "react-bootstrap";
import "../styles/addMoviePage.css";

const API_URL = " http://localhost:5005";

function AddMovie(props) {
  const [movie, setMovie] = useState("");
  const imageRef = useRef("");
  //useRef renvoie un objet ref modifiable dont la propriété current est initialisée avec l’argument fourni (initialValue)
  //useRef est comme une « boîte » qui pourrait contenir une valeur modifiable dans sa propriété .current.
  //Si vous passez un objet ref à React avec <div ref={myRef} />, React calera sa propriété .current sur le nœud DOM correspondant chaque fois que ce dernier change.
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const [checkedGenre, setcheckedGenre] = useState([]);

  // get all genres from MongoDB and render once
  useEffect(() => {
    axios
      .get(`${API_URL}/api/genres`)
      .then((response) => {
        console.log("===>here is the response", response);
        console.log("===>here is the response.data", response.data);
        setGenres(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
      console.log("@@@ existing", existing);
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

  //  ********* this method submit the form *********
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent the form to reload

    const { title, description, mainActor, genres } = movie; // destructuring the state

    //* As we got a file and upload it we need to use the FormData object
    const formData = new FormData(); // create a form data => an object to send as post body

    //* appending the keys / values pairs to the FormData
    formData.append("title", title); // create a key [title] on the formData
    formData.append("description", description);
    formData.append("mainActor", mainActor);

    for (var i = 0; i < checkedGenre.length; i++) {
      formData.append("genres[]", checkedGenre[i]);
    }
    console.log("genres array", genres);

    //* last: accessing the image out of the ref ...
    formData.append("imageUrl", imageRef.current.files[0]); // target the image file associated to the input[type=file]
    console.log("------ FORM DATA -----");
    console.log(formData); // <= this looks like a empty object

    //*** creating new ones (POST request) */
    try {
      console.log("formData", formData);

      const response = await axios.post(`${API_URL}/api/movies`, formData);

      console.log("Here!!!! A new movie is creating", response.data);

      navigate("/movies");
    } catch (error) {
      console.log("Error when adding the new movie", error);
    }
  };

  return (
    <div className="AddMovie">
      {/* <h1> New Movie</h1> */}
      <Container fluid>
        <Form className="addMovieform">
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="title"
              name="title"
              value={movie.title}
              onChange={(e) => {
                setMovie({ ...movie, title: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="description"> Description:</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              // type="description"
              name="description"
              id="description"
              value={movie.description}
              onChange={(e) =>
                setMovie({ ...movie, description: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label> Main Actor:</Form.Label>
            <Form.Control
              type="mainActor"
              name="mainActor"
              value={movie.mainActor}
              onChange={(e) =>
                setMovie({ ...movie, mainActor: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <h5>Select the movie genres</h5>
            <div className="checkboxes">
              {genres.map((genre, index) => {
                return (
                  <div key={genre._id} className="checkbox">
                    <input
                      key={genre._id}
                      type="checkbox"
                      id={index}
                      name={genre.name}
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
            <Form.Control type="file" ref={imageRef} name="imageUrl" />
          </Form.Group>
          {""}
          <div className="mb-2">
            <Button variant="primary" size="sm" onClick={handleSubmit}>
              Save
            </Button>
            {""}
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default AddMovie;
