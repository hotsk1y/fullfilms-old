import React from "react";
import "./Header.scss";

export default function Header({ query, setQuery, fetchSearch }) {

    return (
    <div className="header">
      <div className="wrapper">
        <div className="logo" onClick={() => window.location.reload()}>
          <img src="big-logo.png" alt="" />
        </div>
        <div className="search">
          <input
            className="search__input"
            type="text"
            placeholder="Название фильма..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <button className="search__btn" onClick={fetchSearch}>
            Найти
          </button>
        </div>
      </div>
    </div>
  );
}
