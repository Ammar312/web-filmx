import React from "react";
import { FaGithub, FaWhatsapp, FaTwitter, FaLinkedin } from "react-icons/fa";
import ContentWrapper from "./ContentWrapper";

const Footer = () => {
  return (
    <footer className="bg-black3 py-[50px] text-white relative">
      <ContentWrapper>
        <div className="flex items-center flex-col">
          <ul className="list-none flex justify-center items-center gap-4 mb-5 md:mb-[30px] md:gap-[30px]">
            <li className="transition ease-linear duration-[0.3s] cursor-pointer text-xs md:text-base hover:text-pink">
              Terms Of Use
            </li>
            <li className="transition ease-linear duration-[0.3s] cursor-pointer text-xs md:text-base hover:text-pink">
              Privacy-Policy
            </li>
            <li className="transition ease-linear duration-[0.3s] cursor-pointer text-xs md:text-base hover:text-pink">
              About
            </li>
            <li className="transition ease-linear duration-[0.3s] cursor-pointer text-xs md:text-base hover:text-pink">
              Blog
            </li>
            <li className="transition ease-linear duration-[0.3s] cursor-pointer text-xs md:text-base hover:text-pink">
              FAQ
            </li>
          </ul>
          <div className="text-xs opacity-50 text-center max-w-[800px] mb-5 md:text-base md:mb-[30px]">
            It is a platform that provides information about movies, including
            reviews, ratings, trailers, and showtimes. It’s a one-stop-shop for
            movie enthusiasts to stay up-to-date with the latest releases and
            news
          </div>
          <div className="flex items-center justify-center gap-[10px]">
            <a
              href="https://github.com/Ammar312/"
              target="_blank"
              className="w-[50px] h-[50px] rounded-[50%] bg-black flex items-center justify-center cursor-pointer transition ease-linear duration-[0.3s] hover:shadow-shad hover:text-pink"
            >
              <FaGithub />
            </a>
            <a
              href=" https://wa.me/3104160942"
              target="_blank"
              className="w-[50px] h-[50px] rounded-[50%] bg-black flex items-center justify-center cursor-pointer transition ease-linear duration-[0.3s] hover:shadow-[0_0_0.625em_#da2f68] hover:text-pink"
            >
              <FaWhatsapp />
            </a>
            <a className="w-[50px] h-[50px] rounded-[50%] bg-black flex items-center justify-center cursor-pointer transition ease-linear duration-[0.3s] hover:shadow-shad hover:text-pink">
              <FaTwitter />
            </a>
            <a
              href="https://www.linkedin.com/in/ammar-ul-mustafa-728b5820b/"
              target="_blank"
              className="w-[50px] h-[50px] rounded-[50%] bg-black flex items-center justify-center cursor-pointer transition ease-linear duration-[0.3s] hover:shadow-shad hover:text-pink"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </ContentWrapper>
    </footer>
  );
};

export default Footer;
