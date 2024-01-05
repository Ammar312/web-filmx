import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";

import useFetch from "../../hook/useFetch";
import { fetchApi } from "../../components/Api";
import ContentWrapper from "../../components/ContentWrapper";
import MovieCard from "../../components/MovieCard";
import Spinner from "../../components/Spinner";

import "./Explore.css";

let filters = {};

const sortbyData = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  {
    value: "primary_release_date.desc",
    label: "Release Date Descending",
  },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];
const Explore = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState(null);
  const [sortby, setSortby] = useState(null);
  const { mediaType } = useParams();

  const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const response = await fetchApi(`/discover/${mediaType}`, filters);
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
        `/discover/${mediaType}?page=${pageNum}`,
        filters
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
    filters = {};
    setData(null);
    setPageNum(1);
    setSortby(null);
    setGenre(null);
    fetchInitialData();
  }, [mediaType]);

  const onChange = (selectedItems, action) => {
    if (action.name === "sortby") {
      setSortby(selectedItems);
      if (action.action !== "clear") {
        filters.sort_by = selectedItems.value;
      } else {
        delete filters.sort_by;
      }
    }

    if (action.name === "genres") {
      setGenre(selectedItems);
      if (action.action !== "clear") {
        let genreId = selectedItems.map((g) => g.id);
        genreId = JSON.stringify(genreId).slice(1, -1);
        filters.with_genres = genreId;
      } else {
        delete filters.with_genres;
      }
    }
    setPageNum(1);
    fetchInitialData();
  };
  return (
    <div className="explorePage min-h-[700px] pt-[100px]">
      <ContentWrapper>
        <div className="pageHeader flex justify-between mb-[25px] flex-col md:flex-row">
          <div className="pageTitle text-2xl text-white mb-5 md:m-0">
            {mediaType === "movie" ? "Explore Movies" : "Explore TV Shows"}
          </div>
          <div className="filters flex gap-[10px] flex-col md:flex-row">
            <Select
              isMulti
              name="genres"
              value={genre}
              closeMenuOnSelect={false}
              options={genresData?.genres}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              onChange={onChange}
              placeholder="Select Genres"
              className="react-select-container genresDD w-full md:max-w-[500px] md:min-w-[250px]"
              classNamePrefix="react-select"
            />
            <Select
              name="sortby"
              value={sortby}
              options={sortbyData}
              onChange={onChange}
              isClearable={true}
              placeholder="Sort By"
              className="react-select-container sortbyDD w-full flex-shrink-0 md:w-[250px]"
              classNamePrefix="react-select"
              menuShouldBlockScroll={true}
            />
          </div>
        </div>
        {loading && <Spinner initial={true} />}

        {!loading && (
          <>
            {data?.results?.length > 0 ? (
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
                    <MovieCard key={index} data={item} mediaType={mediaType} />
                  );
                })}
              </InfiniteScroll>
            ) : (
              <span className="resultNotFound text-2xl text-black-light">
                Sorry, Results not found!
              </span>
            )}
          </>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Explore;
