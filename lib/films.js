import axios from "axios";

export const getPopularMovies = async (page) => {
  let moviesArr = [];

  for (let i = page; i <= 20; i++) {
    const response = await axios.get(
      `${process.env.BASE_URL}movie/popular?api_key=${process.env.API_KEY}&language=pt-BR&page=${i}`
    );
    const data = await response.data.results;
    moviesArr = moviesArr.concat(data);
  }
  return moviesArr;
};

export const getMovie = async (id) => {
  const response = await fetch(
    `${process.env.BASE_URL}movie/${id}?api_key=${process.env.API_KEY}&language=pt-BR`
  ).then((res) => res.json());
  return response;
};

export const getMovieRelease = async (id) => {
  const response = await fetch(
    `${process.env.BASE_URL}movie/${id}/release_dates?api_key=${process.env.API_KEY}&language=pt-BR`
  ).then((res) => res.json());
  return response;
};

export const getMovieCrew = async (id) => {
  const response = await fetch(
    `${process.env.BASE_URL}movie/${id}/credits?api_key=${process.env.API_KEY}&language=pt-BR`
  ).then((res) => res.json());
  return response;
};

export const getMovieVideos = async (id) => {
  const response = await fetch(
    `${process.env.BASE_URL}movie/${id}/videos?api_key=${process.env.API_KEY}&language=pt-BR`
  ).then((res) => res.json());
  return response;
};

export const getMovieByGenre = async (genre) => {
  const response = await fetch(
    `${process.env.BASE_URL}discover/movie?api_key=${process.env.API_KEY}&language=pt-BR&with_genres=${genre}`
  ).then((res) => res.json());
  return response;
};

export const getFilters = async (page) => {
  const response = await axios.get(
    `${process.env.BASE_URL}/genre/movie/list?api_key=${process.env.API_KEY}&language=pt-BR&${page}`
  );
  const data = await response.data.genres;
  return data;
};
