import React from "react";
import Header from "./components/header";

function Search(){

  return(
    <div>
      <Header />
      <div className="flex justify-center items-center mt-8">
        <form  className="flex w-1/3 h-12 border-gray-400 border-2 rounded-xl">
          <input type="search" required={true} placeholder="검색 할 포켓몬의 이름을 정확히 입력해주세요!" className="px-4 py-2 w-full rounded-xl"/>
          <input type="submit" value="검색"  className="px-4 py-2 bg-blue-500 text-white rounded-lg"/>
        </form>
      </div>
    </div>
  );
}

export default Search;