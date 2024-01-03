import React from "react";
import useFetch from "../../../hook/useFetch";
import Carousel from "../../../components/Carousel";

const Recommendation = ({ mediaType, id }) => {
  const { data, loading, error } = useFetch(
    `/${mediaType}/${id}/recommendations`
  );
  console.log("Recommendation", data);
  return (
    <div>
      {data?.results?.length !== 0 ? (
        <Carousel
          data={data?.results}
          loading={loading}
          endpoint={mediaType}
          title={`Recommendation`}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Recommendation;
