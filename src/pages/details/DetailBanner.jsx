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
                <div className="content">
                  <div className="left">
                    {data.poster_path ? (
                      <Img
                        className="posterImg"
                        src={url.backdrop + data.poster_path}
                      />
                    ) : (
                      <Img className={`posterImg`} src={PosterFallBack} />
                    )}
                  </div>
                  <div className="right">
                    <div className="title">
                      {`${data.name || data.title} ${dayjs(
                        data?.release_date
                      ).format("YYYY")}`}
                    </div>
                    <div className="subtitle">{data.tagline}</div>
                    <Genres data={_genres} />
                    <div className="row">
                      <CirkleRating rating={data.vote_average.toFixed(1)} />
                      <div
                        className="playbtn"
                        onClick={() => {
                          setShow(true);
                          setVideoId(video.key);
                        }}
                      >
                        <PlayIcon />
                        <span className="text">Watch Trailer</span>
                      </div>
                    </div>
                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data.overview}</div>
                    </div>
                    <div className="info">
                      {data.status && (
                        <div className="infoItem">
                          <span className="text bold">Status:</span>
                          <div className="text">{data.status}</div>
                        </div>
                      )}
                      {data.release_date && (
                        <div className="infoItem">
                          <span className="text bold">Release:</span>
                          <div className="text">
                            {dayjs(data.release_date).format("MMM D, YYYY")}
                          </div>
                        </div>
                      )}
                      {data.runtime && (
                        <div className="infoItem">
                          <span className="text bold">Runtime:</span>
                          <div className="text">
                            {toHoursAndMinutes(data.runtime)}
                          </div>
                        </div>
                      )}
                    </div>
                    {director?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Director:</span>
                        <span className="text">
                          {director.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {director.length - 1 !== 1 && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                    {writer.length > 0 && (
                      <div className="info">
                        <span className="text bold">Writer:</span>
                        <span className="text">
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
                      <div className="info">
                        <span className="text bold">Created By:</span>
                        <span className="text">
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
