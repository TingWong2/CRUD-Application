import { Link } from "react-router-dom";
import "../styles/movieListPage.css";

function Card(props) {
  return (
    <div className="card">
      <img src={props.img} alt="movie" className="card__img" />
      <div className="card__body">
        <Link to={`/movies/${props.movieId}`}>
          <h2 className="card__title">{props.title}</h2>
        </Link>
        <p className="card__mainActor">{props.mainActor}</p>
        <p className="card__genres">{props.genres}</p>
        <p className="card__description">{props.description}</p>
      </div>
    </div>
  );
}

export default Card;
