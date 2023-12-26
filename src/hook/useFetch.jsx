import { useEffect, useState } from "react";
import { fetchApi } from "../components/Api";
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading("loading...");
    setData(null);
    setError(null);

    fetchApi(url)
      .then((res) => {
        setLoading(false);
        setData(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError("Something went wrong!");
      });
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
