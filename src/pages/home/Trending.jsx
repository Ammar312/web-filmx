import React, { useState } from "react";
import ContentWrapper from "../../components/ContentWrapper";
import SwitchTab from "../../components/SwitchTab";
import useFetch from "../../hook/useFetch";
import Carousel from "../../components/Carousel";

const Trending = () => {
  const [endPoint, setEndPoint] = useState("day");
  const { data, loading } = useFetch(`/trending/movie/${endPoint}`);
  const onTabChange = (tab) => {
    setEndPoint(tab === "Day" ? "day" : "week");
  };

  return (
    <div className=" relative mb-[70px]">
      <ContentWrapper>
        <div className=" flex items-center justify-between mb-[70px]">
          <span className="text-2xl text-white font-normal">Trending</span>
          <SwitchTab data={["Day", "Week"]} onTabChange={onTabChange} />
        </div>
        <Carousel data={data.result} loading={loading} />
      </ContentWrapper>
    </div>
  );
};

export default Trending;