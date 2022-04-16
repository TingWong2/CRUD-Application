import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="NavMain">
      <Link to="/">Home</Link>
      <Link to="/movies">Movies</Link>
      <Link to="/movies/add">New Movie</Link>
    </nav>
  );
}

export default Navbar;
