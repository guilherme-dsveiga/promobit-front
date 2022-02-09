import Image from "next/image";
import { useEffect, useState } from "react";
import {
  getMovie,
  getMovieRelease,
  getMovieCrew,
  getMovieVideos,
  getMovieByGenre,
} from "../../lib/films";
import Header from "../../shared/header";
import ProgressCircle from "../../shared/progress-circle";
import MovieGrid from "../../shared/movie-grid";

export default function Movie({
  movie,
  movieRelease,
  movieCrew,
  movieVideos,
  movieByGenre,
}) {
  const [data, setData] = useState([]);
  const [sliced, setSliced] = useState([]);
  const date = new Date(movieRelease[0].release_dates[0].release_date);
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();

  useEffect(() => {
    setData(movie);
    setSliced(movieByGenre.results.slice(0, 6));
  }, [movie, movieByGenre.results]);

  return (
    <div>
      <Header />
      {data ? (
        <main className="font-roboto">
          <article className="bg-dark-purple pb-20 px-4 lg:flex lg:items-center lg:px-20">
            <div className="lg:absolute pt-8 lg:pt-0 lg:top-32">
              <div className="flex mx-auto w-[186px] h-[279px] lg:w-[383px] lg:h-[574px] relative">
                <Image
                  className="rounded lg:rounded-lg drop-shadow-md"
                  src={process.env.IMAGE_URL + movie.poster_path}
                  layout="fill"
                  alt={movie.title}
                />
              </div>
            </div>
            <div className="pt-10 text-white text-lg lg:pl-[450px]">
              <h2 className="text-white text-3xl font-bold">
                {movie.title + " (" + year + ")"}
              </h2>
              <p>{movieRelease[0].release_dates[0].certification + " anos"}</p>
              <p>{day + "/" + month + "/" + year}</p>
              <div className="flex flex-wrap">
                {movie.genres.map((genre, key) => {
                  if (key == movie.genres.length - 1) {
                    return genre.name;
                  }
                  return genre.name + ", ";
                })}
              </div>
              <p>{`${Math.floor(movie.runtime / 60)}h ${
                movie.runtime % 60
              }min`}</p>
              <div className="mt-8 flex gap-3 items-center">
                <ProgressCircle progress={movie.vote_average * 10} />
                <p className="text-base">
                  Avaliação dos
                  <br /> usuários
                </p>
              </div>
              <div className="pt-8">
                <h3 className="text-xl font-bold mb-4">Sinópse</h3>
                <p>{movie.overview}</p>
              </div>
              <div className="pt-8">
                <ul className="flex flex-wrap gap-7">
                  <li>
                    <h6 className="font-bold">{movieCrew[0].name}</h6>
                    <p className="text-sm">{movieCrew[0].character}</p>
                  </li>
                  <li>
                    <h6 className="font-bold">{movieCrew[1].name}</h6>
                    <p className="text-sm">{movieCrew[1].character}</p>
                  </li>
                  <li>
                    <h6 className="font-bold">{movieCrew[2].name}</h6>
                    <p className="text-sm">{movieCrew[2].character}</p>
                  </li>
                  <li>
                    <h6 className="font-bold">{movieCrew[3].name}</h6>
                    <p className="text-sm">{movieCrew[3].character}</p>
                  </li>
                </ul>
              </div>
            </div>
          </article>
          <div className="px-4 md:mt-20 lg:px-20">
            <div className="mt-8 ">
              <h2 className="font-bold text-3xl">Elenco Original</h2>
              {/*transformar em componente */}
              <div
                className="mt-5 overflow-x-scroll overflow-y-hidden flex justify-start gap-4"
                style={{
                  scrollbarWidth: "auto",
                  scrollbarColor: "#dddddd #ffffff",
                  "&::webkitScrollbar": {
                    width: "15px",
                  },
                  "&::webkitScrollbarTrack": {
                    background: "#ffffff",
                  },
                  "&::webkitScrollbarThumb": {
                    backgroundColor: "#dddddd",
                    borderRadius: "10px",
                    border: "3px solid #ffffff",
                  },
                }}
              >
                {movieCrew.slice(0, 20).map((person, key) => (
                  <div
                    key={key}
                    className="p-2 rounded shadow-md shadow-gray-400 mb-6"
                  >
                    <div className="w-[175px] object-contain ">
                      <Image
                        src={process.env.IMAGE_URL + person.profile_path}
                        width={"175px"}
                        height={"222px"}
                        className=" object-cover rounded"
                        alt={`Foto de perfil ${
                          person.gender === 1 ? "do " : "da "
                        }${person.original_name}`}
                      />
                      <h6 className="pt-4 text-lg font-bold">
                        {person.original_name}
                      </h6>
                      <p className="pt-1">{person.character}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-11">
              <h2 className="font-bold text-3xl">Trailer</h2>
              {movieVideos[0] ? (
                <div className="h-[315px] md:h-[512px] lg:max-w-[907px] lg:mt-6">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${movieVideos[0].key}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  ></iframe>
                </div>
              ) : (
                <p className="mt-10 text-lg text-center">
                  Nenhum Video foi encontrado!
                </p>
              )}
            </div>
            <div className="mt-12 lg:flex lg:flex-col lg:justify-center lg:items-start">
              <h2 className="font-bold text-3xl">Recomendações</h2>
              <MovieGrid filter="" movies={sliced} />
            </div>
          </div>
        </main>
      ) : null}
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const { id } = context.query;
  const movie = await getMovie(id);
  const movieRelease = await getMovieRelease(id);
  const moviewCrew = await getMovieCrew(id);
  const movieVideos = await getMovieVideos(id);
  const movieByGenre = await getMovieByGenre(movie.genres[0].id);
  return {
    props: {
      movie: movie,
      movieRelease: movieRelease.results,
      movieCrew: moviewCrew.cast,
      movieVideos: movieVideos.results,
      movieByGenre: movieByGenre,
      id: id,
    },
  };
};

/*const sliced = Object.keys(movieByGenre.results)
    .slice(0, 4)
    .reduce((result, key) => {
      result[key] = movieByGenre.results[key];

      return result;
    }, {}); */
