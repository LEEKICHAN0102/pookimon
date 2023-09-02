import React from "react";

function Card({pokemon,pokemonId,imageUrl,koreanName,pokemonType}){

  return(
    <div className="flex flex-col  rounded-xl border-4 border-blue-200 w-full h-56">
      <div className="flex bg-blue-200 w-full h-8 rounded justify-center items-center">
        <span className="text-sm">{`no.${pokemonId}`}</span>
        <span className="font-semibold text-sm">{koreanName}</span>
      </div>
      <div className="flex items-center justify-center m-auto hover:scale-125 transition-all cursor-pointer">
        <img src={imageUrl} alt={pokemon.name} />
      </div>
      <div className="flex bg-blue-200 w-full h-8 rounded justify-center items-center">
        <span className="font-semibold text-sm">{pokemonType}</span>
      </div>
    </div>
  )
}

export default Card;