import React, { useEffect, useState } from "react";
import "./Banner.css";
import axios from "./axios";
import requests from "./request";


function Banner() {
    const [movie, setMovie] = useState([]);

  //use useEffect to run code on a condition
  useEffect(() => {
    async function fetchData() {
        const request = await axios.get(requests.fetchTrending);
        setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1) //random movie function
        ]);
        return request;
    }
    fetchData();
}, []);
console.log(movie);

  //this function truncate helps make description fit in the banner
  function truncate(str,n){
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}
return (
    //begin to add background image in 'banner' container
    //use <style></style>
    <header className="banner">
        style=
        {{
        backgroundSize: "cover",
        backgroundImage: `url(
                "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
            )`,
        backgroundPosition: "center center", //centres the image in background
    }}
    <div className="banner_content">
        {/** title: conditional to look for name of movies*/}
        <h1 className="banner_title">
            {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_buttons">
            <button className="banner_buttons">Play</button>
            <button className="banner_buttons">My List</button>
            {/** banner_buttons x2*/}
        </div>
        <h1 className="banner_description">{movie?.overview}</h1>
        {truncate(movie?.overview, 150)}
        {/** banner_description*/}
        </div>
        <div className="banner--fadeBottom"></div>
    </header>
    
);
}

export default Banner;
