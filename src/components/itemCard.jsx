import React from "react";
import ItemDetail from "./itemDetail";
import LazyLoad from "react-lazy-load";
import Loader from "./loader";

function Item({item,koreanName,imageUrl,koreanItemDescription}){

  return(
    <div className="flex flex-col  rounded-xl border-4 border-blue-200 w-full h-56">
      <div className="flex bg-blue-200 w-full h-8 rounded justify-center items-center">
        {/* <span className="text-sm">{`no.${pokemonId}`}</span> */}
        <span className="font-semibold text-sm">{koreanName}</span>
      </div>
      <LazyLoad className="flex items-center justify-center m-auto hover:scale-125 transition-all cursor-pointer">
        {imageUrl ? (
          <img  src={imageUrl} alt={item.name} className="w-16 h-16" />)
            :(
            <Loader/>
          )}
      </LazyLoad>
      <div className="flex justify-center">
        <ItemDetail 
          koreanName={koreanName}
          imageUrl={imageUrl}
          koreanItemDescription={koreanItemDescription}
        />
      </div>
    </div>
  )
}

export default Item;