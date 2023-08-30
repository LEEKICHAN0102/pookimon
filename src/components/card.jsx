import React from "react";

function Card({pokemon,imageUrl}){
  return(
  <div className="flex flex-col items-center justify-center rounded-xl border-4 border-blue-200 w-full h-56">
    <span className="font-semibold text-sm">{pokemon.name}</span>
    <img src={imageUrl} alt={pokemon.name} />
  </div>
  )
}

export default Card;