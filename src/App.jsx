import "./App.scss";
import "./global.scss";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Content from "./components/Content/Content";

import axios from "axios";
import { useEffect, useState, useCallback } from "react";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [IsError, setIsError] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  const fetchPopular = async () => {
    setIsLoaded(false);
    setIsSearch(false);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=ru`
      );
      const films = response.data.results;
      setMovies(films);
      console.log(films);
      return films;
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    fetchPopular();
  }, []);

  const [query, setQuery] = useState("");

  const fetchSearch = async () => {
    setIsLoaded(false);
    try {
      if (query.trim() !== "") {
        setIsSearch(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/multi?api_key=${
            process.env.REACT_APP_API_KEY
          }&language=ru&query=${query.trimStart()}&page=1&include_adult=false`
        );
        const searchResults = response.data.results;
        setMovies(searchResults);
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoaded(true);
    }
  };

  const [heroTitle, setHeroTitle] = useState(null);
  const [heroDescr, setHeroDescr] = useState(null);
  const [heroImg, setHeroImg] = useState(null);
  const [heroVideoLinkRu, setHeroVideoLinkRu] = useState(null);
  const [heroVideoLinkEn, setHeroVideoLinkEn] = useState(null);
  const [heroTrailer, setHeroTrailer] = useState(null);
  const [activeTrailer, setActiveTrailer] = useState(true);

  const selectHero = useCallback(() => {
    for (let i = 0; i < movies.length; i++) {
      if (movies[i].overview.length < 320 && movies[i].overview.length !== 0) {
        setHeroImg(
          `https://image.tmdb.org/t/p/w1280/${movies[i].backdrop_path}`
        );
        setHeroTitle(movies[i].title);
        setHeroDescr(movies[i].overview);
        setHeroVideoLinkRu(
          `https://api.themoviedb.org/3/movie/${movies[i].id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=ru`
        );
        setHeroVideoLinkEn(
          `https://api.themoviedb.org/3/movie/${movies[i].id}/videos?api_key=${process.env.REACT_APP_API_KEY}`
        );
        break;
      }
    }
  }, [movies]);

  const getTrailer = useCallback(() => {
    if (heroVideoLinkRu || heroVideoLinkEn) {
      axios
        .get(heroVideoLinkRu)
        .then((res) => setHeroTrailer(res.data.results[0].key))
        .catch((e) => {
          console.log("Russian trailer not found");
          axios
            .get(heroVideoLinkEn)
            .then((res) => {
              setHeroTrailer(res.data.results[0].key);
            })
            .catch((e) => {
              console.log("There is no trailer for this movie");
              setActiveTrailer(false);
            });
        });
    }
  }, [heroVideoLinkRu, heroVideoLinkEn]);

  useEffect(() => {
    selectHero();
    getTrailer();
  }, [selectHero, getTrailer]);

  return (
    <div className="App">
      {isLoaded && !IsError ? (
        <>
          <Header
            query={query}
            setQuery={setQuery}
            setMovies={setMovies}
            fetchSearch={fetchSearch}
            setIsSearch={setIsSearch}
          />
          {!isSearch && movies.length > 0 && (
            <Hero
              heroTitle={heroTitle}
              heroDescr={heroDescr}
              heroImg={heroImg}
              heroTrailer={heroTrailer}
              activeTrailer={activeTrailer}
            />
          )}
          <Content movies={movies} isSearch={isSearch} />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default App;
