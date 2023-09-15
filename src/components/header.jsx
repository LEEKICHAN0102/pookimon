import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };


  return (
      <nav className="bg-teal-500 p-6 lg:px-16 md:px-12 fixed top-0 left-0 w-full" style={{zIndex:10}}>
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex items-center flex-shrink-0 text-white mr-6 hover:scale-110 transition-all hover:text-red-400">
            <Link to="/" className="font-semibold text-xl tracking-tight">푸키먼</Link>
          </div>
          <div className="block lg:hidden">
            <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white transition-all" onClick={toggleMenu}>
              {isMenuOpen ? (
                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Close</title><path d="M6.293 6.293a1 1 0 011.414 0L10 10.586l2.293-2.293a1 1 0 111.414 1.414L11.414 12l2.293 2.293a1 1 0 11-1.414 1.414L10 13.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 12 6.293 9.707a1 1 0 010-1.414z"/></svg>
              ) : (
                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
              )}
            </button>
          </div>
          <div className={`w-full ${isMenuOpen ? 'block' : 'hidden'} lg:flex lg:items-center lg:w-auto`}>
            <div className="text-sm lg:flex-grow">
              <Link to="/" href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4 transition-all">
                포켓몬 도감
              </Link>
              <Link to="/tools" href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4 transition-all">
                도구/아이템
              </Link>
              <Link to="search" href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white transition-all">
                검색
              </Link>
            </div>
          </div>
        </div>
      </nav>
  );
}

export default Header;
