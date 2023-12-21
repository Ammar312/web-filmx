import React from "react";
import ContentWrapper from "../../components/ContentWrapper";
import SwitchTab from "../../components/SwitchTab";

const Trending = () => {
  const onTabChange = (tab) => {};
  return (
    <div className=" relative mb-[70px]">
      <ContentWrapper>
        <span className="text-2xl text-white font-normal">Trending</span>
        <SwitchTab data={["Day,Week"]} onTabChange={onTabChange} />
      </ContentWrapper>
    </div>
  );
};

export default Trending;
