import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import fetchMovies from "../../api/fetchMovies";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { id } = useParams();
  const endPoint = `/movie/${id}/reviews`;
  const { data, error } = fetchMovies(endPoint);
  error && toast.error(error.message);

  return (
    data.results &&
    (data.results.length > 0 ? (
      <ul className={css.list}>
        <Toaster />
        {data.results.map(({ id, author, content }) => (
          <li className={css.item} key={id}>
            <h3 className={css.title}>Author: {author}</h3>
            <p className={css.dscr}>{content}</p>
          </li>
        ))}
      </ul>
    ) : (
      <p className={css.message}>OOPS! Sorry but we dont have any reviews</p>
    ))
  );
}
