import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useFetch from "../../hook/useFetch";
import DetailBanner from "./DetailBanner";

const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );
  const [official, setOfficial] = useState(null);

  useEffect(() => {
    if (data?.results) {
      for (let v = 0; v < data?.results.length; v++) {
        if (data?.results?.[v].name === "Official Trailer") {
          setOfficial(data?.results?.[v]);
          break;
        } else {
          setOfficial(data?.results?.[data?.results?.length - 1]);
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
