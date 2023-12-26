import React, { useState } from "react";
import ContentWrapper from "../../components/ContentWrapper";
import SwitchTab from "../../components/SwitchTab";
import useFetch from "../../hook/useFetch";
import Carousel from "../../components/Carousel";

const Popular = () => {
  const [endPoint, setEndPoint] = useState("movie");
  const { data, loading } = useFetch(`/${endPoint}/popular`);
  const onTabChange = (tab) => {
    setEndPoint(tab === "Movies" ? "movie" : "tv");
  };

  return (
    <div className=" relative mb-[70px]">
      <ContentWrapper>
        <div className=" flex items-center justify-between mb-[70px]">
          <span className="text-2xl text-white font-normal">Popular</span>
          <SwitchTab data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
        </div>
        <Carousel data={data?.results} loading={loading} endpoint={endPoint} />
      </ContentWrapper>
    </div>
  );
};

export default Popular;
