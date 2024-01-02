import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Spinner = ({ initial }) => {
  return (
    <div
      className={`my-4 w-full h-[150px] flex items-center justify-center relative ${
        initial ? "!h-[700px]" : ""
      }`}
    >
      <ClipLoader
        size={50}
        color="#93bfec"
        loading={true}
        aria-label="Loading Spinner"
        data-testid="loader"
        speedMultiplier={0.8}
      />
    </div>
  );
};

export default Spinner;
