import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import { fetchApi } from "../components/Api";
import ContentWrapper from "../components/ContentWrapper";
import Spinner from "../components/Spinner";
import MovieCard from "../components/MovieCard";

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const response = await fetchApi(
        `/search/multi?query=${query}&include_adult=true&page=${pageNum}`
      );
      setData(response);
      setPageNum((prev) => prev + 1);
      setLoading(false);
      console.log("searchresult: ", response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNextPageData = async () => {
    try {
      const response = await fetchApi(
        `/search/multi?query=${query}&include_adult=true&page=${pageNum}`
      );
      if (data?.results) {
        setData({ ...data, results: [...data?.results, ...response.results] });
      } else {
        setData(response);
      }
      setPageNum((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);
  return (
    <div className="searchResultsPage min-h-[700px] pt-[100px]">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle text-2xl text-white mb-[50px]">
                {`Search ${
                  data?.results?.length > 1 ? "results" : "result"
                } of '${query}'`}
              </div>
              <InfiniteScroll
                className="content flex flex-row flex-wrap gap-[10px] mb-[50px] md:gap-5"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results.map((item, index) => {
                  if (item.media_type === "person") return;
                  return (
                    <MovieCard key={index} data={item} fromSearch={true} />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className="resultNotFound text-2xl text-black-light">
              Sorry, Results not found!
            </span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
