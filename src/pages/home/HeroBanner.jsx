import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hook/useFetch";

const HeroBanner = () => {
  const [background, setBackground] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const searchHandler = (e) => {
    if (e.code === "Enter" && search.length > 0) {
      navigate(`/search/${search}`);
    }
  };

  return (
    <div>
      <div>
        <div>
          <span>Welcome</span>
          <span>
            Million of Movies, TvShows and people to discover. Explore Now
          </span>
          <div>
            <input
              type="search"
              placeholder="Search for a Movie or TvShow"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <button type="submit">Search</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
