import React from "react";
import useFetch from "../../../hook/useFetch";
import Carousel from "../../../components/Carousel";
import ContentWrapper from "../../../components/ContentWrapper";

const Recommendation = ({ mediaType, id }) => {
  const { data, loading, error } = useFetch(
    `/${mediaType}/${id}/recommendations`
  );
  console.log("Recommendation", data);
  return (
    <div>
      <Carousel
        data={data?.results}
        loading={loading}
        endpoint={mediaType}
        title={`Recommendation`}
      />
    </div>
  );
};

export default Recommendation;
