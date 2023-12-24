import React, { useState } from "react";

const SwitchTab = ({ data, onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);

  const activeTab = (tab, index) => {
    console.log("active tab");
    setLeft(index * 100);
    setTimeout(() => {
      setSelectedTab(index);
    }, 300);
    onTabChange(tab, index);
    console.log("leftState", left);
  };

  return (
    <div className="h-[34px] bg-white rounded-[20px] p-[2px]">
      <div className="flex items-center h-[30px] relative">
        {data.map((tab, index) => {
          return (
            <span
              key={index}
              className={`flex items-center justify-center w-[100px] h-full text-black text-sm relative z-10 cursor-pointer transition-colors ease-linear duration-300 ${
                selectedTab === index ? " text-white" : ""
              }`}
              onClick={() => activeTab(tab, index)}
            >
              {tab}
            </span>
          );
        })}
        <span
          className={`h-[30px] w-[100px] rounded-2xl bg-gradient absolute transition-[left] ease-expo duration-500 left-[${left}px]`}
        />
      </div>
    </div>
  );
};

export default SwitchTab;
