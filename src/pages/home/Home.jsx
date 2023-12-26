import React from "react";
import HeroBanner from "./HeroBanner";
import Trending from "./Trending";
import Popular from "./Popular";
import TopRated from "./TopRated";

const Home = () => {
  return (
    <div>
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
      {/* <div className="h-96"></div> */}
    </div>
  );
};

export default Home;
