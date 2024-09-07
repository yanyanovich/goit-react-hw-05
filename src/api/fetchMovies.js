import axios from "axios";
import { useEffect, useState } from "react";

export default function fetchMovies(endPoint, query) {
  const [data, setData] = useState({});
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  axios.defaults.baseURL = "https://api.themoviedb.org/3";

  useEffect(() => {
    const params = {
      api_key: "b176763492c5d7c845cccff2974ecab3",
      language: "en-US",
    };

    if (endPoint === "/search/movie" && !query) {
      return;
    } else if (endPoint === "/search/movie" && query) {
      params.query = query;
    }

    const fetchData = async () => {
      setLoader(true);

      try {
        const { data } = await axios.get(endPoint, { params });
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoader(false);
      }
    };
    fetchData();
  }, [endPoint, query]);

  return { data, loader, error };
}
