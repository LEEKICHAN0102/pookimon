import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="w-full h-32 bg-blue-200">
      <nav className="flex justify-center h-full items-center space-x-8 ">
        <div className="flex">
          <Link to="/" className="text-xl font-semibold text-white hover:text-blue-500">
            푸키먼
          </Link>
        </div>
        <div className="flex">
          <Link to="/" className="text-xl font-semibold text-white hover:text-blue-500">
            포켓몬 도감
          </Link>
          <Link to="/tools" className="text-xl font-semibold text-white hover:text-blue-500">
            도구/아이템
          </Link>
          <Link to="/search" className="text-xl font-semibold text-white hover:text-blue-500">
            검색
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Header;
