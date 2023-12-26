import React from "react";
import HeroBanner from "./HeroBanner";
import Trending from "./Trending";
import Popular from "./Popular";

const Home = () => {
  return (
    <div>
      <HeroBanner />
      <Trending />
      <Popular />
      <div className="h-96"></div>
    </div>
  );
};

export default Home;
