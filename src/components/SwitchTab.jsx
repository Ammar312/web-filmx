import React, { useState } from "react";

const SwitchTab = ({ data, onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);

  const activeTab = (tab, index) => {
    setLeft(index * 100);
    setTimeout(() => {
      setSelectedTab(index);
    }, 300);
    onTabChange(tab, index);
  };

  return (
    <div className="">
      <div>
        {data.map((tab, index) => {
          <span
            key={index}
            className={`tab ${selectedTab === index ? "active" : ""}`}
            onClick={() => activeTab(tab, index)}
          >
            {tab}
          </span>;
        })}
        <span className={`movingBg ${left}`}></span>
      </div>
    </div>
  );
};

export default SwitchTab;
