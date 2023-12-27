import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/HomeSlice";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import Explore from "./pages/Explore";
import PageNotFound from "./pages/PageNotFound";
import SearchResult from "./pages/SearchResult";
import { fetchApi } from "./components/Api";
function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);
  // console.log(url);
  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);
  const fetchApiConfig = async () => {
    try {
      const res = await fetchApi("/configuration");
      // console.log(res);
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url));
    } catch (error) {
      console.log(error);
    }
  };
  const genresCall = async () => {
    let promises = [];
    let endpoints = ["movie", "tv"];
    let allGenres = {};
    endpoints.forEach((url) => {
      promises.push(fetchApi(`/genre/${url}/list`));
    });
    const data = await Promise.all(promises);

    data.map((genreindex) => {
      return genreindex.genres?.map((item) => (allGenres[item.id] = item));
    });

    dispatch(getGenres(allGenres));
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
