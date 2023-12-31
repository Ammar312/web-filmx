import React from "react";
import { useSelector } from "react-redux";

import ContentWrapper from "../../components/ContentWrapper";
import Avatar from "../../assets/avatar.png";
import Img from "../../components/lazyLoadImg/Img";

const Cast = ({ data, loading }) => {
  const { url } = useSelector((state) => state.home);

  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton animate-pulse w-[125px] h-[125px] rounded-full  mb-[15px] md:h-[175px] md:w-[175px] md:mb-[25px]"></div>
        <div className="w-full h-5 rounded-[10px] mb-[10px] skeleton animate-pulse"></div>
        <div className="w-[75%] h-5 rounded-[10px] my-0 mx-auto skeleton animate-pulse"></div>
      </div>
    );
  };
  return (
    <div className="castSection relative mb-[50px]">
      <ContentWrapper>
        <div className="sectionHeading text-2xl text-white mb-[25px]">
          Top Cast
        </div>
        {!loading ? (
          <div className="listItems flex  gap-5 overflow-y-hidden -mr-5 -ml-5 py-0 px-5 md:m-0 md:p-0 ">
            {data?.map((item) => {
              let imgUrl = item.profile_path
                ? url.profile + item.profile_path
                : Avatar;
              return (
                <div key={item.id} className="listItem text-center text-white">
                  <div className="profileImg w-[125px] h-[125px] rounded-full overflow-hidden mb-[15px] md:h-[175px] md:w-[175px] md:mb-[25px]">
                    <span className="w-full h-full object-cover object-center block">
                      <Img src={imgUrl} />
                    </span>
                  </div>
                  <div className="name text-sm font-semibold md:text-lg md:leading-6 ">
                    {item.name}
                  </div>
                  <div className="character text-sm opacity-50 md:text-base">
                    {item.character}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="listItems flex  gap-5 overflow-y-hidden -mr-5 -ml-5 py-0 px-5 md:m-0 md:p-0">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Cast;
