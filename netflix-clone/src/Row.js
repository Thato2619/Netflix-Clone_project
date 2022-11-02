import React, { useEffect, useState } from "react";
import axios from "./axios";
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

//baseUrl for the lack of functionlaity
const baseUrl = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState(""); //

  //A snippet of code which runs based on a specific condition/variable
  useEffect(() => {
    //if [], run code once when row loads(don't run it again)
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      console.log(request.data.results);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  //when user clicks on picture, set the trailerUrl and clear video
  const handleclick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl(""); //helps clear the video
    } else {
      movieTrailer(movie?.name || "") //movieTrailer is an npm module to find Youtuber trailer for the movie
        .then((url) => {
          //helps get only the Youtbe video ID instead of whole URL
          const urlParams = new URLSearchParams(URL(url).search); //URLSearchParams helps get ID for longer url links
          setTrailerUrl(urlParams.get("v"));
        })
        //catches any error that would disrupt the process
        .catch((error) => console.log(error));
    }
  };

  console.log(movies);
  return (
    <div className="row">
      {/** prop ~ title */}
      <h2>{title}</h2>

      <div className="row-poster">
        {/** several row_posters */}

        {movies.map((movie) => (
          <img
            key={movie.id} /*assists with uniqueness to the movies by ID*/
            onClick={() => handleclick(movie)}
            className={`{row_posters} ${isLargeRow && "row_posterLarge"}`}
            src={`${baseUrl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
      {/**container=> posters */}
    </div>
  );
}

export default Row;

 