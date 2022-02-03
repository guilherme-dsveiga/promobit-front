import axios from "axios";

export const getPopularMovies = async (page) => {
  const response = await axios.get(
    `${process.env.BASE_URL}movie/popular?api_key=${process.env.API_KEY}&language=pt-BR&page=${page}`
  );
  const data = await response.data;
  return data;
};

export const getMovie = async (id) => {
  const response = await fetch(
    `${process.env.BASE_URL}movie/${id}?api_key=${process.env.API_KEY}&language=pt-BR`
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
