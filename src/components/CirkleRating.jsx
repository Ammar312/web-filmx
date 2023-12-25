import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// import "./CirkleRating.css";

const CirkleRating = ({ rating }) => {
  return (
    <div className="bg-black rounded-full p-[2px]">
      <CircularProgressbar
        value={rating}
        maxValue={10}
        text={rating}
        styles={buildStyles({
          pathColor: rating < 5 ? "red" : rating < 7 ? "orange" : "green",
          trailColor: "transparent",
          textSize: "34px",
        })}
      />
    </div>
  );
};

export default CirkleRating;
