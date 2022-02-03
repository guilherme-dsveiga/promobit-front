import Header from "../../shared/header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getMovie } from "../../lib/films";

export default function Movie({ movie }) {
  const router = useRouter();
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(movie);
  }, [movie]);

  return (
    <div>
      <Header />
      {data ? <div>{data.title}</div> : null}
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const { id } = context.query;
  const movieDetails = await getMovie(id);
  return {
    props: {
      movie: movieDetails,
      id: id,
    },
  };
};
