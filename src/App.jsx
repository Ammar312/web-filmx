import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/Details";
import Explore from "./pages/Explore";
import PageNotFound from "./pages/PageNotFound";
import SearchResult from "./pages/SearchResult";

import { fetchApi } from "./components/Api";
function App() {
  useEffect(() => {
    apiTesting();
  }, []);
  const apiTesting = () => {
    try {
      const res = fetchApi("/movie/popular");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <BrowserRouter>
      <Routes>
        <Routes path="/" element={<Home />} />
        <Routes path="/:mediaType/:id" element={<Details />} />
        <Routes path="/explore/:mediaType" element={<Explore />} />
        <Routes path="/search/:query" element={<SearchResult />} />
        <Routes path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
