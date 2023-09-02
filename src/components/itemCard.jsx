import React from "react";

function Item({item,koreanName,imageUrl}){

  return(
    <div className="flex flex-col  rounded-xl border-4 border-blue-200 w-full h-56">
      <div className="flex bg-blue-200 w-full h-8 rounded justify-center items-center">
        {/* <span className="text-sm">{`no.${pokemonId}`}</span> */}
        <span className="font-semibold text-sm">{koreanName}</span>
      </div>
      <div className="flex items-center justify-center m-auto hover:scale-125 transition-all cursor-pointer">
        <img  src={imageUrl} alt={item.name} className="w-16 h-16" />
      </div>
    </div>
  )
}

export default Item;