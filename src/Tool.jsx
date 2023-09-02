import React, { useState, useEffect } from "react";
import { getKoreanItemAPI, getAllItemAPI,getItemImageURL } from "./routes/api";
import Item from "./components/itemCard";
import Header from "./components/header.jsx"; // Header 컴포넌트 임포트

function Tool() {
  const [itemList,setItemList]=useState([]);
  const [itemImageUrls,setItemImageUrls]=useState({});
  const [koreanNames,setKoreanNames]=useState({});

  useEffect(() => {
    async function fetchData() {
      try{
        const itemData = await getAllItemAPI();
        setItemList(itemData);
        
        const koreanNamesData = {};
        for (const item of itemData) {
          koreanNamesData[item.name] = await getKoreanItemAPI(item.name);
        }
        setKoreanNames(koreanNamesData);

        const itemImageUrls = {};
        for (const item of itemData){
          itemImageUrls[item.name] = await getItemImageURL(item.name);
        }
        setItemImageUrls(itemImageUrls);
      } catch(error){
        console.error('Error:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <div className="grid grid-cols-4 gap-4">
        {itemList.map((item, index) => (
          <Item 
            key={index}
            item={item}
            koreanName={koreanNames[item.name]}
            imageUrl={itemImageUrls[item.name]}
          />
        ))}
      </div>
    </div>
  );
}

export default Tool;
