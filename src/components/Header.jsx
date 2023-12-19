import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation, Link } from "react-router-dom";

import ContentWrapper from "./ContentWrapper";
import logo from "../assets/movix-logo.svg";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };
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
  const searchHandler = (e) => {
    if (e.code === "Enter" && search.length > 0) {
      navigate(`/search/${search}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
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
            <Link to="/">
              <img src={logo} alt="logo" className="h-[52px]" />
            </Link>
          </div>
          <ul
            className={` cursor-pointer ${
              mobileMenu
                ? "flex absolute top-[60px] left-0 bg-black3 flex-col w-full py-5 border-t border-solid border-t-white border-opacity-10 animate-mobileMenu"
                : "list-none hidden items-center md:flex"
            }`}
          >
            <li
              className={`h-[60px] flex items-center mx-4 text-white font-bold relative hover:text-red-500 ${
                mobileMenu && "menuItemMobile"
              }`}
              onClick={() => {
                navigationHandler("movie");
              }}
            >
              Movies
            </li>
            <li
              className={`h-[60px] flex items-center mx-4 text-white font-bold relative hover:text-red-500 ${
                mobileMenu && "menuItemMobile"
              }`}
              onClick={() => {
                navigationHandler("tv");
              }}
            >
              TV Shows
            </li>
            <li
              className={`h-[60px] flex items-center mx-4 text-white font-bold relative hover:text-red-500 ${
                mobileMenu && "hidden"
              }`}
            >
              <HiOutlineSearch onClick={openSearch} />
            </li>
          </ul>
          <div className=" flex items-center gap-5 md:hidden text-white text-lg">
            <HiOutlineSearch onClick={openSearch} />
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
      {showSearch && (
        <div className=" w-full h-[60px] bg-white absolute top-[60px] animate-mobileMenu md:bg-transparent ">
          <ContentWrapper>
            <div className=" flex items-center w-full h-10 mt-2">
              <input
                type="search"
                className="w-full h-[50px] bg-white outline-none border-none rounded-[30px 0 0 30px] py-0 px-4 text-sm   md:text-xl md:p-[0px 30px]"
                placeholder="Search for a movie "
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                onKeyDown={searchHandler}
              />
              <VscChromeClose
                className="text-xl shrink-0 ml-[10px] cursor-pointer md:text-white"
                onClick={() => {
                  setShowSearch(false);
                  setSearch("");
                }}
              />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
