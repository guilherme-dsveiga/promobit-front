import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function MovieGrid({ filter, movies, rawData, setDataLength }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    let tempArr = [];
    if (filter.length == 0) {
      setData(movies);
    } else {
      if (movies) {
        rawData.map((movie) => {
          if (filter.every((val) => movie.genre_ids.includes(val))) {
            tempArr.push(movie);
          }
        });
      }
    }
    if (setDataLength) {
      if (tempArr.length == 0) {
        setDataLength(movies.length);
      } else {
        setDataLength(tempArr.length);
      }
    }

    tempArr = tempArr.filter(
      (value, index, self) => index === self.findIndex((t) => t.id === value.id)
    );

    if (tempArr != "") {
      setData(tempArr.slice(0, 20));
    } else if (filter != "") {
      setData("");
    } else {
      setData(movies);
    }
  }, [filter, movies, rawData]);

  return (
    <div className="flex flex-wrap my-10 gap-4 justify-center font-roboto">
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

export default MovieGrid;
