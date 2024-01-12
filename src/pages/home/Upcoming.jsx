import React, { useState } from "react";
import ContentWrapper from "../../components/ContentWrapper";
import SwitchTab from "../../components/SwitchTab";
import useFetch from "../../hook/useFetch";
import Carousel from "../../components/Carousel";

const Upcoming = () => {
  //   const [endPoint, setEndPoint] = useState("day");
  const { data, loading } = useFetch(`/movie/upcoming`);
  //   const onTabChange = (tab) => {
  //     setEndPoint(tab === "Day" ? "day" : "week");
  //   };
  console.log("upcoming", data?.results);
  return (
    <div className=" relative mb-[70px]">
      <ContentWrapper>
        <div className=" flex items-center justify-between mb-[70px]">
          <span className="text-2xl text-white font-normal">Upcoming</span>
          {/* <SwitchTab data={["Day", "Week"]} onTabChange={onTabChange} /> */}
        </div>
        <Carousel data={data?.results} loading={loading} endpoint={"movie"} />
      </ContentWrapper>
    </div>
  );
};

export default Upcoming;
