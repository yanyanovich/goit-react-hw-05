import css from "./MoviesPage.module.css";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import MovieList from "../../components/MovieList/MovieList";
import fetchMovies from "../../api/fetchMovies";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query"));
  const endpoint = "/search/movie";
  const { data, error } = fetchMovies(endpoint, query);

  error && toast.error(error.message);

  useEffect(() => {
    if (data.total_results === 0) toast.error("There is no movie with this title.");
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const query = form.elements.query.value.trim();

    if (!query) {
      toast.error("Request cannot be empty");
    } else {
      setQuery(query);
      const nextParams = query !== "" ? { query } : {};
      setSearchParams(nextParams);
    }
  };

  return (
    <div>
      <Toaster />
      <form className={css.form} onSubmit={handleSubmit}>
        <input className={css.input} type="text" name="query" autoComplete="off" />
        <button type="submit" className={css.btn}>
          Search
        </button>
      </form>
      {data.results && <MovieList movieList={data.results}>MoviesPage</MovieList>}
    </div>
  );
}
