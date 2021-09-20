import React from "react";
import "./Content.scss";
import MovieItem from "../MovieItem/MovieItem";

export default function Popular({ movies, isSearch }) {
  console.log(movies);

  return (
    <div className="popular">
      <div className="container">
        <div className="section__title">{isSearch ? "Search results" : "Popular movies"}</div>
        <div className="popular__items">
          {movies.map((movie) => {
            return (
              <MovieItem
                key={movie.id}
                title={movie.title ? movie.title : movie.name}
                descr={movie.overview}
                image={movie.poster_path}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
