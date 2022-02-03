import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function MovieGrid({ filter, movies }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    let tempArr = [];
    if (movies) {
      movies.map((movie) => {
        movie.genre_ids.map((id) => {
          if (filter === id) {
            tempArr.push(movie);
          }
        });
      });
    }
    if (tempArr != "") {
      setData(tempArr);
    } else if (filter != "") {
      setData("");
    } else {
      setData(movies);
    }
  }, [filter, movies]);

  return (
    <div className="flex flex-wrap mt-10 gap-4 justify-center">
      {data ? (
        data.map((movie, key) => (
          <Link key={key} passHref href={`/films/${movie.id}`}>
            <div className="cursor-pointer">
              <Image
                src={`${process.env.IMAGE_URL}${movie.poster_path}`}
                alt={`Image do filme ${movie.title}`}
                width={"154px"}
                height={"232px"}
                layout="intrinsic"
                className="rounded"
              />
              <h4 className="max-w-[154px] mt-2 text-sm font-bold">
                {movie.title}
              </h4>
              <h5 className="text-[12px] font-bold">{movie.release_date}</h5>
            </div>
          </Link>
        ))
      ) : (
        <p className="text-lg">Nenhum filme foi encontrado!</p>
      )}
    </div>
  );
}

/*
filter ? 
movies.genre_list.map((n) => {
  filter === movies.genre_list[n] ? renderizar componente : null
  : null
})
 */

export default MovieGrid;
