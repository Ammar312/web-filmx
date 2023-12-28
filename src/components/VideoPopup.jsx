import React, { useEffect, useRef } from "react";
import ReactPlayer from "react-player/youtube";

const VideoPopup = ({ show, setShow, videoId, setVideoId }) => {
  const hidePopup = () => {
    setShow(false);
    setVideoId(null);
  };

  //   const playerRef = useRef(null);

  //   useEffect(() => {
  //     if (show && playerRef.current) {
  //       playerRef.current.internalPlayer.playVideo();
  //     }
  //   }, [show]);
  return (
    <div
      className={`flex justify-center items-center w-full h-full fixed top-0 left-0 opacity-0 z-30 invisible  ${
        show ? "visible opacity-100" : ""
      }`}
    >
      <div
        className={`absolute top-0 left-0 w-full h-full bg-[#00000040] backdrop-blur-[3.5px] opacity-0 transition-opacity duration-500  ${
          show ? " opacity-100" : ""
        }`}
        onClick={hidePopup}
      ></div>
      <div
        className={`relative w-[800px] aspect-video bg-white scale-[0.2] transition-transform duration-[250ms]  ${
          show ? "scale-100" : ""
        }`}
      >
        <span
          className="absolute -top-5 right-0 text-white cursor-pointer"
          onClick={hidePopup}
        >
          Close
        </span>
        <ReactPlayer
          //   url={`https://www.youtube.com/watch?v=${videoId}`}
          url={`/youtube/watch?v=${videoId}`}
          controls
          width="100%"
          height="100%"
          // playing={true}
        />
        {/* <iframe
          title="YouTube Video"
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          allowFullScreen
          ref={playerRef}
        ></iframe> */}
      </div>
    </div>
  );
};

export default VideoPopup;
