import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import "./header.css";
import ContentWrapper from "./ContentWrapper";
import logo from "../assets/movix-logo.svg";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <header className="fixed translate-y-0 w-full h-[60px] z-10 flex items-center transition duration-100 ease-in-out border-red-200 border-2">
      <ContentWrapper>
        <div className=" flex justify-between items-center">
          <div className=" cursor-pointer">
            <img src={logo} alt="logo" className="h-[52px]" />
          </div>
          <ul className="list-none hidden items-center md:flex">
            <li
              onClick={() => {}}
              className="h-[60px] flex items-center mx-4 text-white font-bold relative"
            >
              Movies
            </li>
            <li className="h-[60px] flex items-center mx-4 text-white font-bold relative">
              TV Shows
            </li>
            <li className="h-[60px] flex items-center mx-4 text-white font-bold relative">
              <HiOutlineSearch />
            </li>
          </ul>
          <div>
            <HiOutlineSearch />
            {mobileMenu ? <VscChromeClose /> : <SlMenu />}
          </div>
        </div>
      </ContentWrapper>
    </header>
  );
};

export default Header;
