import axios from "../../api/axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./DetailPage.css";

const DetailPage = () => {
  let { movieId } = useParams();
  //let movieId = useParams().movieId;
  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}`
      );
      console.log("response ====>", response);
      setMovie(response.data);
    }
    fetchData();
  }, [movieId]);

  console.log("Movie===>", movie);

  if (!movie) return null;

  return (
    <section>
      <div className="container">
        <img
          className="modal__poster-img"
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          alt="modal__poster-img"
        />
        <div className="original-title">{movie.original_title}</div>
        <div className="title">{movie.title} </div>
      </div>
    </section>
  );
};

export default DetailPage;
