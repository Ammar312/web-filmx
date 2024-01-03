import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ContentWrapper from "./ContentWrapper";
import Img from "./lazyLoadImg/Img";
import PosterFallBack from "../assets/no-poster.png";
import Genres from "./Genres";
import CirkleRating from "./CirkleRating";

const MovieCard = ({ data, fromSearch, mediaType }) => {
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const posterUrl = data.poster_path
    ? url.poster + data.poster_path
    : PosterFallBack;

  return (
    <div
      className="movieCard w-[calc(50%-5px)] mb-[25px] cursor-pointer flex-shrink-0 md:w-[calc(25%-15px)] lg:w-[calc(20%-16px)]"
      onClick={() => navigate(`/${data.media_type || mediaType}/${data.id}`)}
    >
      <div className="posterBlock relative w-full aspect-[1/1.5] bg-cover bg-center mb-[30px] flex items-end justify-between p-[10px] transition-all ease-in duration-500 hover:opacity-50 ">
        <span className="absolute top-0 left-0 w-full h-full rounded-xl overflow-hidden">
          <Img
            src={posterUrl}
            className="w-full h-full object-cover object-center"
          />
        </span>
        {!fromSearch && (
          <React.Fragment>
            <span className="w-[40px] h-[40px] relative top-[30px] bg-white rounded-full shrink-0 md:w-[50px] md:h-[50px]">
              <CirkleRating rating={data.vote_average.toFixed(1)} />
            </span>
            <span className="hidden relative md:flex md:flex-wrap md:justify-end">
              <Genres data={data.genre_ids.slice(0, 2)} />
            </span>
          </React.Fragment>
        )}
      </div>
      <div className="textBlock text-white flex flex-col">
        <span className="title text-base mb-[10px] line-clamp-1 text-ellipsis md:text-xl">
          {data.title || data.name}
        </span>
        <span className="date text-sm opacity-50">
          {dayjs(data.release_date).format("MMM D, YYYY")}
        </span>
      </div>
    </div>
  );
};

export default MovieCard;
