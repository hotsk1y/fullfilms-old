import React from "react";
import "./Hero.scss";

export default function Hero({ heroTitle, heroDescr, heroImg, activeTrailer, heroTrailer }) {

  const styles = {
    background: `linear-gradient(to bottom, rgba(0,0,0, .1), rgba(0,0,0, 1)), url(${heroImg}) no-repeat top 10% center`,
  };

  return (
    <div className="hero" style={styles}>
      <div className="wrapper">
        <div className="hero__info">
          <div className="hero__title">{heroTitle}</div>
          <div className="hero__descr">{heroDescr}</div>
          <div className="hero__btn">
          {activeTrailer && <a
          href={`https://www.youtube.com/watch?v=${heroTrailer}`}
          target="_blank"
          rel="noreferrer"
        >
          Смотреть трейлер
        </a>}
          </div>
        </div>        
      </div>
    </div>
  );
}
