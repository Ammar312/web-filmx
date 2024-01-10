import React from "react";
import ContentWrapper from "../components/ContentWrapper";

const PageNotFound = () => {
  return (
    <div className="h-[700px] p-[200px]">
      <ContentWrapper>
        <div className="text-center text-white flex flex-col">
          <span className="bigText text-9xl font-bold">404</span>
          <span className="smallText text-5xl">Page not found!</span>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default PageNotFound;
