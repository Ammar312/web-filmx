import React from "react";
import HeroBanner from "./HeroBanner";
import Trending from "./Trending";

const Home = () => {
  return (
    <div>
      <HeroBanner />
      <Trending />
      <div className="h-96"></div>
    </div>
  );
};

export default Home;
