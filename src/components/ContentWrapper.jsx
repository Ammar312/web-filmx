import React from "react";

const ContentWrapper = ({ children }) => {
  return (
    <div className="w-full max-w-[1200px] my-0 mx-auto py-0 px-5 contentWrapper">
      {children}
    </div>
  );
};

export default ContentWrapper;
