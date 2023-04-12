import React, { useState, useEffect, useCallback } from "react";
import axios from "../api/axios";
import MovieModal from "./MovieModal";
import "./Row.css";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import styled from "styled-components";

const Row = ({ title, id, fetchUrl }) => {
  const [movies, setMovies] = useState([]); // 전체 영화
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({}); // 선택한 하나의 영화

  const fetchMovieData = useCallback(async () => {
    const response = await axios.get(fetchUrl);
    setMovies(response.data.results);
  }, [fetchUrl]);

  useEffect(() => {
    fetchMovieData();
  }, [fetchUrl]);

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
    // console.log(movie);
  };

  return (
    <Container>
      <h2>{title}</h2>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        loop={true} // loop 기능 사용 유무
        navigation // arrow 버튼 사용 유무
        pagination={{ clickable: true }} // 페이지 버튼 보이게 할지
        breakpoints={{
          1378: {
            slidesPerView: 6, // 한번에 보이는 슬라이드 개수
            slidesPerGroup: 6, // 슬라이드 몇 개씩 할지
          },
          998: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          625: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          0: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
      >
        <Content id={id}>
          {movies.map((movie) => (
            <SwiperSlide>
              <Wrap>
                <img
                  key={movie.id}
                  src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  alt={movie.title}
                  onClick={() => handleClick(movie)}
                />
              </Wrap>
            </SwiperSlide>
          ))}
        </Content>
      </Swiper>

      {modalOpen && (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      )}
    </Container>
  );

  // swiper 사용 전 코드
  // return (
  //   <div>
  //     <h2>{title}</h2>
  //     <div className="slider">
  //       <div className="slider__arrow-left">
  //         <span
  //           className="arrow"
  //           onClick={() => {
  //             document.getElementById(id).scrollLeft -= window.innerWidth - 80;
  //           }}
  //         >
  //           {"⬅️"}
  //         </span>
  //       </div>
  //       <div id={id} className="row__posters">
  //         {movies.map((movie) => (
  //           <img
  //             key={movie.id}
  //             className="row__poster"
  //             src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
  //             alt={movie.title}
  //             onClick={() => handleClick(movie)}
  //           />
  //         ))}
  //       </div>
  //       <div className="slider__arrow-right">
  //         <span
  //           className="arrow"
  //           onClick={() => {
  //             document.getElementById(id).scrollLeft += window.innerWidth - 80;
  //           }}
  //         >
  //           {"➡️"}
  //         </span>
  //       </div>
  //     </div>

  //     {modalOpen && (
  //       <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
  //     )}
  //   </div>
  // );
};

export default Row;

const Container = styled.div`
  padding: 0 0 26px;
`;

const Content = styled.div``;

const Wrap = styled.div`
  width: 95%;
  height: 95%;
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.1);

  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500mx ease-in-out 0s;
    width: 100%;
    z-index: 1;
    top: 0;
  }

  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(0.98);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;
