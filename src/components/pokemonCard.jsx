import React from "react";

function Card({pokemon,imageUrl,koreanName,pokemonType}){

  const pokemonTypes = Array.isArray(pokemonType) ? pokemonType.join(", ") : "";
  console.log("koreanName:", koreanName);
console.log("pokemonType:", pokemonType);
  
  return(
  <div className="flex flex-col  rounded-xl border-4 border-blue-200 w-full h-56">
    <div className="flex bg-blue-200 w-full h-8 rounded justify-center items-center">
      <span className="font-semibold text-sm">{koreanName}</span>
    </div>
    <div className="flex items-center justify-center m-auto hover:scale-125 transition-all cursor-pointer">
      <img src={imageUrl} alt={pokemon.name} />
    </div>
    <div className="flex bg-blue-200 w-full h-8 rounded justify-center items-center">
      <span className="font-semibold text-sm">{pokemonTypes}</span>
    </div>
  </div>
  )
}

export default Card;