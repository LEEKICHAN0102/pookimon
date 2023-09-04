import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="w-full h-32 bg-yellow-400 mb-16 rounded-b-xl border-red-400 border-b-4 font-custom">
      <nav className="flex justify-between h-full items-center space-x-8 px-16">
        <div className="flex">
          <Link to="/" className="text-3xl font-semibold text-white hover:text-red-500 transition-all">
            푸키먼
          </Link>
        </div>
        <div className="flex gap-8">
          <Link to="/" className="text-xl font-semibold text-white hover:text-red-500 hover:scale-105 transition-all">
            포켓몬 도감
          </Link>
          <Link to="/tools" className="text-xl font-semibold text-white hover:text-red-500 hover:scale-105 transition-all">
            도구/아이템
          </Link>
          <Link to="/search" className="text-xl font-semibold text-white hover:text-red-500 hover:scale-105 transition-all">
            검색
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Header;
