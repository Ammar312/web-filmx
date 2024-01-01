import React from "react";
import useFetch from "../../../hook/useFetch";
import Carousel from "../../../components/Carousel";

const Similar = ({ mediaType, id }) => {
  const { data, loading, error } = useFetch(`/${mediaType}/${id}/similar`);
  const title = mediaType === "tv" ? "Similar Tv Shows" : "Similar Movies";
  console.log("Similar", data);
  return (
    <div>
      <Carousel
        title={title}
        data={data?.results}
        loading={loading}
        endpoint={mediaType}
      />
    </div>
  );
};

export default Similar;
