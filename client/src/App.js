import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Routes
import HomePage from "./pages/HomePage";
// import MoviesListPage from "./pages/MoviesListPage";
import MoviesListPageCopy from "./pages/MoviesListPageCopy";
import AddMoviePage from "./pages/AddMoviePage";
import MovieDetailPage from "./pages/MovieDetailPage";
import UpdateMoviePage from "./pages/UpdateMoviePage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/movies" element={<MoviesListPage />} /> */}
        <Route path="/movies" element={<MoviesListPageCopy />} />
        <Route path="/movies/add" element={<AddMoviePage />} />
        <Route path="/movies/:movieId" element={<MovieDetailPage />} />
        <Route path="/movies/edit/:movieId" element={<UpdateMoviePage />} />
      </Routes>
    </div>
  );
}

export default App;
