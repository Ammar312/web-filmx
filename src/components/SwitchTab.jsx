import React, { useEffect, useState } from "react";

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
  // useEffect(() => {
  //   // Update the left position when selectedTab changes
  //   setLeft(selectedTab * 100);
  // }, [selectedTab]);

  return (
    <div className="h-[34px] bg-white rounded-[20px] p-[2px]">
      <div className="flex items-center h-[30px] relative">
        {data.map((tab, index) => {
          return (
            <span
              key={index}
              className={`flex items-center justify-center w-[100px] h-full  text-sm relative z-10 cursor-pointer transition-colors ease-linear duration-300 ${
                selectedTab === index ? " text-white" : "text-black"
              }`}
              onClick={() => activeTab(tab, index)}
            >
              {tab}
            </span>
          );
        })}
        {/* <span
          className={`h-[30px] w-[100px] rounded-2xl bg-gradient absolute transition-all ease-out duration-500 left-[${left}px]`}
        /> */}
        <span
          style={{
            height: "30px",
            width: "100px",
            borderRadius: "20px",
            background:
              "linear-gradient(98.37deg, #db7c00 0.99%, #ffe08a 100%)",
            position: "absolute",
            transition: "left 0.3s ease-out",
            left: `${left}px`,
          }}
        />
      </div>
    </div>
  );
};

export default SwitchTab;
