import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetch from "../../hook/useFetch";
import Img from "../../components/lazyLoadImg/Img";
import ContentWrapper from "../../components/ContentWrapper";

const HeroBanner = () => {
  const [background, setBackground] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);

  const { data, loading } = useFetch("/movie/upcoming");
  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);

  const searchHandler = (e) => {
    if (e.code === "Enter" && search.length > 0) {
      navigate(`/search/${search}`);
    }
  };

  return (
    <div className="w-full h-[450px] md:h-[700px] flex items-center relative bg-black">
      {!loading && (
        <div className=" w-full h-full absolute top-0 left-0 opacity-50 overflow-hidden">
          <Img src={background || ""} />
        </div>
      )}

      <div className="w-full h-[250px] opacityLayer absolute bottom-0 left-0"></div>
      <ContentWrapper>
        <div className=" flex flex-col items-center text-white relative max-w-[800px] my-0 mx-auto">
          <span className="text-5xl font-bold mb-[10px] md:mb-0 md:text-[90px]">
            Welcome
          </span>
          <span className=" text-xl font-medium mb-10 md:text-2xl">
            Million of Movies, TvShows and people to discover. Explore Now
          </span>
          <div className=" flex items-center w-full">
            <input
              type="search"
              className="w-[calc(100%-100px)] h-[50px] bg-white outline-none border-none rounded-[30px 0 0 30px py-0 px-4 text-sm md:w-[calc(100%-150px)] md:h-[60px]"
              placeholder="Search for a Movie or TvShow"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <button type="submit">Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
