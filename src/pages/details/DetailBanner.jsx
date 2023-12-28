import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../../components/ContentWrapper";
import useFetch from "../../hook/useFetch";
import CirkleRating from "../../components/CirkleRating";
import Genres from "../../components/Genres";
import Img from "../../components/lazyLoadImg/Img";
import PosterFallBack from "../../assets/no-poster.png";
import { PlayIcon } from "./PlayBtn";
import "./detail.css";

const DetailBanner = ({ video, crew }) => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const { url } = useSelector((state) => state.home);
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const _genres = data?.genres?.map((genre) => genre.id);
  const director = crew?.filter((f) => f.job === "Director");
  const writer = crew?.filter(
    (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
  );

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  return (
    <div className="w-full bg-black pt-[100px] mb-12 md:mb-0 md:pt-[120px] md:min-h-[700px]">
      {!loading ? (
        <>
          {!!data && (
            <React.Fragment>
              <div className="w-full h-full absolute top-0 left-0 opacity-10 overflow-hidden">
                <span className="w-full h-full">
                  <Img
                    src={url.backdrop + data.backdrop_path}
                    className={`w-full h-full object-cover object-center`}
                  />
                </span>
              </div>
              <div className="w-full h-[250px] opacityLayer absolute bottom-0 left-0"></div>
              <ContentWrapper>
                <div className="flex flex-col gap-6 relative md:gap-[50px] md:flex-row">
                  <div className="flex-shrink-0">
                    {data.poster_path ? (
                      <Img
                        className="w-full block rounded-xl md:max-w-[350px]"
                        src={url.backdrop + data.poster_path}
                      />
                    ) : (
                      <Img
                        className={`w-full block rounded-xl md:max-w-[350px]`}
                        src={PosterFallBack}
                      />
                    )}
                  </div>
                  <div className="right text-white">
                    <div className="title text-[28px] leading-10 md:text-[34px] md:leading-[44px]">
                      {`${data.name || data.title} ${dayjs(
                        data?.release_date
                      ).format("YYYY")}`}
                    </div>
                    <div className="subtitle text-base mb-[15px] italic opacity-50 md:text-xl">
                      {data.tagline}
                    </div>
                    <span className="mb-[25px] flex-row flex-wrap">
                      <Genres data={_genres} />
                    </span>
                    <div className="row flex items-center gap-[25px] mb-[25px] mt-4">
                      <span className="max-w-[70px]  md:max-w-[90px] text-white rounded-full">
                        <CirkleRating rating={data.vote_average.toFixed(1)} />
                      </span>
                      <div
                        className="playbtn flex items-center gap-5 cursor-pointer"
                        onClick={() => {
                          setShow(true);
                          setVideoId(video.key);
                        }}
                      >
                        <span className="w-[60px] md:w-[80px]">
                          <PlayIcon />
                        </span>
                        <span className="text text-xl transition-all duration-700 ease-in-out hover:text-pink">
                          Watch Trailer
                        </span>
                      </div>
                    </div>
                    <div className="overview mb-[25px]">
                      <div className="heading text-2xl mb-[10px]">Overview</div>
                      <div className="description leading-6">
                        {data.overview}
                      </div>
                    </div>
                    <div className="info border-b-[1px] border-solid border-[#ffffff1a]">
                      {data.status && (
                        <div className="infoItem mr-[10px] flex flex-wrap flex-row">
                          <span className="text bold mr-[10px]  leading-6 font-semibold opacity-100 ">
                            Status:
                          </span>
                          <div className="text mr-[10px] opacity-50 leading-6">
                            {data.status}
                          </div>
                        </div>
                      )}
                      {data.release_date && (
                        <div className="infoItem  mr-[10px] flex flex-wrap flex-row">
                          <span className="text bold mr-[10px]  leading-6 font-semibold opacity-100 ">
                            Release:
                          </span>
                          <div className="text mr-[10px] opacity-50 leading-6">
                            {dayjs(data.release_date).format("MMM D, YYYY")}
                          </div>
                        </div>
                      )}
                      {data.runtime && (
                        <div className="infoItem  mr-[10px] flex flex-wrap flex-row">
                          <span className="text bold mr-[10px]  leading-6 font-semibold opacity-100 ">
                            Runtime:
                          </span>
                          <div className="text mr-[10px] opacity-50 leading-6">
                            {toHoursAndMinutes(data.runtime)}
                          </div>
                        </div>
                      )}
                    </div>
                    {director?.length > 0 && (
                      <div className="info border-b-[1px] border-solid border-[#ffffff1a]">
                        <span className="text bold mr-[10px]  leading-6 font-semibold opacity-100">
                          Director:
                        </span>
                        <span className="text mr-[10px] opacity-50 leading-6">
                          {director.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {director.length - 1 !== 1 && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                    {writer?.length > 0 && (
                      <div className="info border-b-[1px] border-solid border-[#ffffff1a]">
                        <span className="text bold mr-[10px]  leading-6 font-semibold opacity-100">
                          Writer:
                        </span>
                        <span className="text mr-[10px] opacity-50 leading-6">
                          {writer.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {writer.length - 1 !== 1 && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                    {data.created_by > 0 && (
                      <div className="info border-b-[1px] border-solid border-[#ffffff1a]">
                        <span className="text bold mr-[10px]  leading-6 font-semibold opacity-100">
                          Created By:
                        </span>
                        <span className="text mr-[10px] opacity-50 leading-6">
                          {data.created_by.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {data.created_by.length - 1 !== 1 && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </ContentWrapper>
            </React.Fragment>
          )}
        </>
      ) : (
        <div className="flex relative flex-col gap-[25px] md:gap-[50px] md:flex-row">
          <ContentWrapper>
            <div className="flex gap-[50px]">
              <div className="flex-shrink-0 w-full block rounded-xl aspect-[1/1.5] skeleton animate-pulse md:max-w-[350px]"></div>
              <div className="w-full">
                <div className="w-full h-[25px] mb-5 rounded-[50px] skeleton animate-pulse"></div>
                <div className="h-[25px] mb-[50px] rounded-[50px] skeleton animate-pulse w-[75%]"></div>
                <div className="w-full h-[25px] mb-5 rounded-[50px] skeleton animate-pulse"></div>
                <div className="w-full h-[25px] mb-5 rounded-[50px] skeleton animate-pulse"></div>
                <div className="w-[50%] h-[25px] mb-[50px] rounded-[50px] skeleton animate-pulse"></div>
                <div className="w-full h-[25px] mb-5 rounded-[50px] skeleton animate-pulse"></div>
                <div className="w-full h-[25px] mb-5 rounded-[50px] skeleton animate-pulse"></div>
              </div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailBanner;
