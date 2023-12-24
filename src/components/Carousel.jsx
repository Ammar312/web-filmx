import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import ContentWrapper from "./ContentWrapper";
import Img from "./lazyLoadImg/Img";
import PosterFallBack from "../assets/no-poster.png";
import circleRating from "./circleRating";
import Genres from "./Genres";

const Carousel = ({ data, loading, endpoint, title }) => {
  const carouselContainer = useRef();
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();

  const navigation = (direction) => {};
  const skItem = () => {
    return (
      <div className="w-[125px] shrink-0 md:w-[calc(20%-15px)] lg:w-[calc(20%-16px)]">
        <div className="rounded-xl w-full aspect-[1/1.5] mb-[30px] skeleton"></div>
        <div className="flex flex-col">
          <div className="w-full h-5 mb-[10px] skeleton"></div>
          <div className="w-[75%] h-[20px] skeleton"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="mb-[50px]">
      <ContentWrapper>
        {title && (
          <div className="text-2xl text-white mb-5 font-normal">{title}</div>
        )}
        <BsFillArrowLeftCircleFill
          className="left-[30px] text-[30px] text-black absolute top-[44%] translate-y-[-50%] cursor-pointer opacity-50 z-10 hidden md:block hover:opacity-80"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="right-[30px] text-[30px] text-black absolute top-[44%] translate-y-[-50%] cursor-pointer opacity-50 z-10 hidden md:block hover:opacity-80"
          onClick={() => navigation("right")}
        />

        {!loading ? (
          <div
            className="flex gap-[10px] overflow-y-hidden -mr-5 -ml-5 py-0 px-5 md:gap-5 md:overflow-hidden md:m-0 md:p-0"
            ref={carouselContainer}
          >
            {data?.map((item) => {
              const posterUrl = item.poster_path
                ? url.poster + item.poster_path
                : PosterFallBack;
              return (
                <div
                  key={item.id}
                  className="w-[125px] cursor-pointer shrink-0 md:w-[calc(20%-15px)] lg:w-[calc(20%-16px)]"
                  onClick={() =>
                    navigate(`/${item.media_type || endpoint}/${item.id}`)
                  }
                >
                  <div className="relative w-full aspect-[1/1.5] bg-cover bg-center mb-[30px] flex items-end justify-between p-[10px]">
                    <Img
                      src={posterUrl}
                      className="w-full h-full object-cover object-center"
                    />

                    <circleRating
                      rating={item.vote_average.toFixed(1)}
                      className="w-[40px] h-[40px] relative top-8 bg-white shrink-0 md:w-[50px] md:h-[50px]"
                    />
                    <Genres
                      data={item.genre_ids.slice(0, 2)}
                      className="hidden relative md:flex md:flex-wrap md:justify-end"
                    />
                  </div>
                  <div className="text-white flex flex-col">
                    <span className="text-base mb-[10px] line-clamp-1 text-ellipsis md:text-xl">
                      {item.title || item.name}
                    </span>
                    <span className="text-sm opacity-50">
                      {dayjs(
                        item.release_datelease_date || item.first_air_date
                      ).format("MMM D, YYYY")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex gap-[10px] overflow-y-hidden -mr-5 -ml-5 py-0 px-5 md:gap-5 md:overflow-hidden md:m-0 md:p-0">
            {" "}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
