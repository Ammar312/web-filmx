import React from "react";
import { useParams } from "react-router-dom";

import useFetch from "../../hook/useFetch";
import DetailBanner from "./DetailBanner";

const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  return (
    <div>
      <DetailBanner />
    </div>
  );
};

export default Details;
