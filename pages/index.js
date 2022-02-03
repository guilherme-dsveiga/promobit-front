import Image from "next/image";
import Header from "../shared/header";
import Filter from "../shared/filter";
import MovieGrid from "../shared/movie-grid";
import { getPopularMovies, getFilters } from "../lib/films";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Home({ popularMovies, allFilters, index }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("");
  const router = useRouter();
  const numOfPages = 500;

  useEffect(() => {
    const getMovies = async () => {
      await getPopularMovies(page).then((res) => setData(res));
    };
    getMovies();
    {
      console.log(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    setPage(parseInt(index, 10));
  }, [index]);

  return (
    <div className="flex flex-col">
      <Header />
      <main className="flex flex-col">
        <div className="bg-dark-purple pl-4 py-10">
          <h2 className="text-2xl font-bold text-white pr-10">
            Milhões de Filmes, séries e pessoas para descobrir. Explore já.
          </h2>
          <p className="uppercase text-sm mt-9 mb-2 text-white font-bold">
            Filtre por:
          </p>
          <Filter
            allFilters={allFilters}
            setFilter={setSelectedFilter}
            selectedFilter={selectedFilter}
          />
        </div>
        <MovieGrid filter={selectedFilter} movies={data} />
        <div className="flex mt-16 mb-5 justify-center items-center gap-10 text-purple">
          {page > 1 ? (
            <button
              className="font-bold"
              onClick={() => router.push(`/?page=${1}`)}
            >
              Primeira
            </button>
          ) : null}
          {page > 1 ? (
            <button
              className="font-bold"
              onClick={() => router.push(`/?page=${page - 1}`)}
            >
              {page - 1}
            </button>
          ) : null}
          <button
            className="font-bold"
            onClick={() => router.push(`/?page=${page}`)}
          >
            {page}
          </button>
          <button
            className="font-bold"
            onClick={() => router.push(`/?page=${page + 1}`)}
          >
            {page + 1}
          </button>
          <button
            className="font-bold"
            onClick={() => router.push(`/?page=${page + 1}`)}
          >
            {">"}
          </button>
          <button className="font-bold" onClick={() => handleClick("l")}>
            Última
          </button>
        </div>
      </main>

      <footer className=""></footer>
    </div>
  );
}

export const getServerSideProps = async ({ query: { page = 1 } }) => {
  const filters = await getFilters();
  const popularMovies = await getPopularMovies();
  const index = page;
  return {
    props: {
      allFilters: filters,
      popularMovies: popularMovies,
      index: index,
    },
  };
};
