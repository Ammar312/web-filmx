import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import ContentWrapper from "./ContentWrapper";
import logo from "../assets/movix-logo.svg";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };
  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };
  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }
    setMobileMenu(false);
  };
  return (
    <header
      className={`fixed translate-y-0 w-full h-[60px] z-10 flex items-center transition duration-100 ease-in-out ${show} ${
        mobileMenu ? "!bg-[#020c1b]" : ""
      } `}
    >
      <ContentWrapper>
        <div className=" flex justify-between items-center">
          <div className=" cursor-pointer">
            <img src={logo} alt="logo" className="h-[52px]" />
          </div>
          <ul
            className={` ${
              mobileMenu
                ? "flex absolute top-[60px] left-0 bg-black3 flex-col w-full py-5 border-t border-solid border-t-white border-opacity-10 animate-mobileMenu"
                : "list-none hidden items-center md:flex"
            }`}
          >
            <li
              className={`h-[60px] flex items-center mx-4 text-white font-bold relative ${
                mobileMenu && "menuItemMobile"
              }`}
              onClick={() => {
                navigationHandler("movie");
              }}
            >
              Movies
            </li>
            <li
              className={`h-[60px] flex items-center mx-4 text-white font-bold relative ${
                mobileMenu && "menuItemMobile"
              }`}
              onClick={() => {
                navigationHandler("tv");
              }}
            >
              TV Shows
            </li>
            <li
              className={`h-[60px] flex items-center mx-4 text-white font-bold relative ${
                mobileMenu && "hidden"
              }`}
            >
              <HiOutlineSearch />
            </li>
          </ul>
          <div className=" flex items-center gap-5 md:hidden text-white text-lg">
            <HiOutlineSearch />
            {mobileMenu ? (
              <VscChromeClose
                onClick={() => {
                  setMobileMenu(false);
                }}
              />
            ) : (
              <SlMenu onClick={openMobileMenu} />
            )}
          </div>
        </div>
      </ContentWrapper>
    </header>
  );
};

export default Header;
