import React from "react";
import axios from "../../api/axios";
import "./MovieModal.css";

const MovieModal = ({
  backdrop_path,
  title,
  name,
  overview,
  original_title,
  release_date,
  first_air_date,
  vote_average,
  setModalOpen,
}) => {

  return (
    <div className="presentation" role="presentation">
      <div className="wrapper-modal">
        <div className="modal">
          <span className="modal-close" onClick={() => setModalOpen(false)}>
            ❎
          </span>
          <img
            className="modal__poster-img"
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
            alt="modal-img"
          />
          <div className="modal__content">
            <p className="modal__details">
              <span className="modal__user-perc">100% for you!</span>{" "}
              {release_date ? release_date : first_air_date}
            </p>

            <h2 className="modal__title">{title ? title : name}</h2>
            <p className="modal__overview">평점: {vote_average.toFixed(2)}</p>
            <p className="modal__overview">{overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
