import React, { useState } from "react";

import ContentWrapper from "../../components/ContentWrapper";
import { PlayIcon } from "./PlayBtn";
import VideoPopup from "../../components/VideoPopup";
import Img from "../../components/lazyLoadImg/Img";

const VideoSection = ({ data, loading }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const loadingSkeleton = () => {
    return (
      <div className="skItem w-[150px] shrink-0 md:w-[25%]">
        <div className="thumb skeleton animate-pulse w-full aspect-video rounded-xl mb-[10px]"></div>
        <div className="row skeleton animate-pulse h-5 w-full rounded-[10px] mb-[10px]"></div>
        <div className="row2 skeleton animate-pulse h-5 w-[75%] rounded-[10px]"></div>
      </div>
    );
  };

  return (
    <div className="videoSection relative mb-[50px]">
      <ContentWrapper>
        <div className="SectionHeading text-2xl text-white mb-[25px]">
          OFFICIAL VIDEOS
        </div>
        {!loading ? (
          <div className="videos flex gap-[10px] overflow-x-auto -mr-5 -ml-5 py-0 px-5 md:gap-5 md:m-0 md:p-0">
            {data?.results?.map((video) => (
              <div
                key={video.id}
                className="videoItem w-[150px] shrink-0 cursor-pointer md:w-[25%]"
                onClick={() => {
                  setVideoId(video.key);
                  setShow(true);
                }}
              >
                <div className="videoThumbnail mb-[15px] relative">
                  <span className="w-full block rounded-xl transition-all duration-700 ease-in-out hover:opacity-50">
                    <Img
                      src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                    />
                  </span>
                  <span className=" absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[50px] h-[50px]">
                    <PlayIcon />
                  </span>
                </div>
                <div className="videoTitle text-white text-sm md:text-base">
                  {video.name}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="videoSkleton flex gap-[10px] overflow-x-auto -mr-5 -ml-5 py-0 px-5 md:gap-5 md:m-0 md:p-0">
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
          </div>
        )}
      </ContentWrapper>
      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
};

export default VideoSection;
