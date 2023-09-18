import React from "react";
import Detail from "./pokemonDetail";
import colors from "../../color";
import typeIcons from "../../icon";
import LazyLoad from "react-lazy-load";
import Loader from "../loader";

function Card({pokemon,pokemonId,pokemonAbilities,imageUrl,koreanName,pokemonType,koreanPokemonType,koreanDescription,officialArtwork,shinyArtwork,koreanDivision,koreanAbilities}){
  function getTypeColor(type) {
    return colors[type] || "#FFFFFF"; // 타입 정보가 없으면 기본 색상 사용
  }
  
  return(
    <div  className="flex flex-col  rounded-xl border-4 border-blue-200 w-full h-56 ">
      <div className="flex bg-blue-200 w-full h-8 rounded justify-between items-center px-4">
        <div>
          <span className="text-sm">no. </span>
          <span className="text-sm">{pokemonId}</span>
        </div>
        <span className=" text-32">{koreanName}</span>
      </div>
      <LazyLoad className="flex items-center justify-center m-auto hover:scale-125 transition-all">
          {imageUrl ? (
            <img src={imageUrl} alt={pokemon.name} />
          ):(
            <Loader />
          )}
      </LazyLoad>
      <div className="flex justify-center">
        <Detail
          koreanName={koreanName}
          imageUrl={imageUrl}
          pokemonType={pokemonType}
          pokemonAbilities={pokemonAbilities}
          koreanPokemonType = {koreanPokemonType}
          koreanDescription={koreanDescription}
          officialArtwork={officialArtwork}
          shinyArtwork={shinyArtwork}
          koreanDivision={koreanDivision}
          koreanAbilities={koreanAbilities}
        />
      </div>
      <div className="flex bg-blue-200 w-full h-8 rounded justify-center items-center">
        {pokemonType && pokemonType.length > 0 && koreanPokemonType && koreanPokemonType.length > 0
          ? pokemonType.map((type, index) => (
            <div
              key={index}
              style={{ backgroundColor: getTypeColor(type) }}
              className="flex justify-center items-center w-2/5 h-6 rounded-lg ml-2"
            >
              <img  src={typeIcons[type]} alt={type} className="w-3 h-3 mr-2" />
              <span className="text-sm mr-4" >{koreanPokemonType[index]}</span>
            </div>
          ))
          : null
        }
      </div>
    </div>
  )
}

export default Card;