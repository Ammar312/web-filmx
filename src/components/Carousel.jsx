import React, { useEffect, useRef, useState } from "react";
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

import Genres from "./Genres";
import CirkleRating from "./CirkleRating";
import "./Carousel.css";

const Carousel = ({ data, loading, endpoint, title }) => {
  const carouselContainer = useRef();

  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const [hide, setHide] = useState({ left: true, right: false });

  const navigation = (direction) => {
    const container = carouselContainer.current;
    const scrollAmount =
      direction === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);
    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
    console.log("scrollWidth", container.scrollWidth);
    console.log("scrollAmount", scrollAmount);
    console.log("scrollLeft", container.scrollLeft);
    console.log("offsetWidth", container.offsetWidth);
  };
  // Function to check if the container has reached the end
  useEffect(() => {
    const container = carouselContainer.current;

    const handleScroll = () => {
      const isStartReached = container.scrollLeft <= 0;
      const isEndReached =
        container.scrollLeft + container.offsetWidth >= container.scrollWidth;
      setHide({
        left: isStartReached,
        right: isEndReached,
      });
    };
    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [carouselContainer]);

  const skItem = () => {
    return (
      <div className="w-[125px] shrink-0 md:w-[calc(20%-15px)] lg:w-[calc(20%-16px)]">
        <div className="rounded-xl w-full aspect-[1/1.5] mb-[30px] skeleton animate-pulse"></div>
        <div className="flex flex-col">
          <div className="w-full h-5 mb-[10px] skeleton animate-pulse"></div>
          <div className="w-[75%] h-[20px] skeleton animate-pulse"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="mb-[50px] carousel">
      <ContentWrapper>
        {title && (
          <div className="text-2xl text-white mb-5 font-normal">{title}</div>
        )}
        {data?.length > 5 && (
          <BsFillArrowLeftCircleFill
            className={`left-[30px] text-[30px] text-white absolute top-[44%] translate-y-[-50%] cursor-pointer opacity-80 z-10 hidden md:block hover:opacity-100 ${
              hide.left ? "invisible" : ""
            } `}
            onClick={() => navigation("left")}
          />
        )}
        {data?.length > 5 && (
          <BsFillArrowRightCircleFill
            className={`right-[30px] text-[30px] text-white absolute top-[44%] translate-y-[-50%] cursor-pointer opacity-80 z-10 hidden md:block hover:opacity-100 ${
              hide.right ? "invisible" : ""
            }`}
            onClick={() => navigation("right")}
          />
        )}

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
                  className="w-[125px] cursor-pointer shrink-0 md:w-[calc(20%-15px)] lg:w-[calc(20%-16px)] overflow-hidden"
                  onClick={() =>
                    navigate(`/${item.media_type || endpoint}/${item.id}`)
                  }
                >
                  <div className="relative w-full aspect-[1/1.5] bg-cover bg-center mb-[30px] flex items-end justify-between p-[10px]">
                    <span className="absolute top-0 left-0 w-full h-full rounded-xl overflow-hidden">
                      <Img
                        src={posterUrl}
                        className="w-full h-full object-cover object-center"
                      />
                    </span>
                    <span className="w-[40px] h-[40px] relative top-8 bg-white rounded-full shrink-0 md:w-[50px] md:h-[50px]">
                      <CirkleRating rating={item.vote_average.toFixed(1)} />
                    </span>
                    <span className="hidden relative md:flex md:flex-wrap md:justify-end">
                      <Genres data={item.genre_ids.slice(0, 2)} />
                    </span>
                  </div>
                  <div className="text-white flex flex-col">
                    <span className="text-base mb-[10px] line-clamp-1 text-ellipsis md:text-xl">
                      {item.title || item.name}
                    </span>
                    <span className="text-sm opacity-50">
                      {dayjs(item.release_date || item.first_air_date).format(
                        "MMM D, YYYY"
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex gap-[10px] overflow-y-hidden -mr-5 -ml-5 py-0 px-5 md:gap-5 md:overflow-hidden md:m-0 md:p-0">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
