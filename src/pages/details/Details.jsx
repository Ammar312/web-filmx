import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useFetch from "../../hook/useFetch";
import DetailBanner from "./DetailBanner";

const Details = () => {
  const [official, setOfficial] = useState(null);
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  useEffect(() => {
    if (data?.results) {
      for (let v = 0; v < data?.results.length; v++) {
        if (data?.results?.[v].name === "Official Trailer") {
          setOfficial(data?.results?.[v]);
          break;
        }
      }
    }
  }, [data]);
  console.log("video: ", data);
  return (
    <div>
      <DetailBanner video={official} crew={credits?.crew} />
    </div>
  );
};

export default Details;
