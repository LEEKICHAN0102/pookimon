import React,{useState,useEffect} from "react";
import { getAllItemAPI,getKoreanItemDescription } from "../routes/api";
import ItemDetail from "./itemDetail";

function Item({item,koreanName,imageUrl}){
  const [itemList,setItemList]=useState([]);
  const [koreanItemDescription,setKoreanItemDescription]=useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const itemData = await getAllItemAPI();
        setItemList(itemData);
  
        const koreanItemDescriptionData = {};
        for (const item of itemData) {
          koreanItemDescriptionData[item.name] = await getKoreanItemDescription(item.name);
        }
        setKoreanItemDescription(koreanItemDescriptionData);
  
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchData();
  }, []);

  return(
    <div className="flex flex-col  rounded-xl border-4 border-blue-200 w-full h-56">
      <div className="flex bg-blue-200 w-full h-8 rounded justify-center items-center">
        {/* <span className="text-sm">{`no.${pokemonId}`}</span> */}
        <span className="font-semibold text-sm">{koreanName}</span>
      </div>
      <div className="flex items-center justify-center m-auto hover:scale-125 transition-all cursor-pointer">
        <img  src={imageUrl} alt={item.name} className="w-16 h-16" />
      </div>
      <div className="flex justify-center">
        <ItemDetail 
          koreanName={koreanName}
          imageUrl={imageUrl}
          koreanItemDescription={koreanItemDescription[item.name]}
        />
      </div>
    </div>
  )
}

export default Item;