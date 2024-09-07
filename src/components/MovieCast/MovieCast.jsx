import { useParams } from "react-router-dom";
import fetchMovies from "../../api/fetchMovies";
import toast, { Toaster } from "react-hot-toast";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const defaultImg = "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";
  const { id } = useParams();
  const endpoint = `/movie/${id}/casts`;
  const { data, error } = fetchMovies(endpoint);
  error && toast.error(error.message);

  return (
    <>
      <Toaster />
      {data.cast && (
        <ul className={css.list}>
          {data.cast.map(({ id, profile_path, name, character }) => (
            <li className={css.item} key={id}>
              <img className={css.img} src={profile_path ? `https://image.tmdb.org/t/p/w500/${profile_path}` : defaultImg} alt={name} />
              <p className={css.dscr}>{name}</p>
              <p className={css.dscr}>{character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
