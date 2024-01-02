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

  return <div></div>;
};

export default MovieCard;
