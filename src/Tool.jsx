import React, { useState, useEffect } from "react";
import { 
  getKoreanItemAPI, 
  getAllItemAPI,
  getItemImageURL,
  getKoreanItemDescription 
} from "./api/itemApi";
import Item from "./components/item/itemCard";
import Header from "./components/header.jsx"; // Header 컴포넌트 임포트
import { useInView } from "react-intersection-observer";

function Tool() {
  const LIMIT_PER_PAGE = 20;

  const [itemList,setItemList]=useState([]);
  const [itemImageUrls,setItemImageUrls]=useState({});
  const [koreanNames,setKoreanNames]=useState({});
  const [koreanItemDescription,setKoreanItemDescription]=useState({});
  const [page,setPage]=useState(0);

  const [ref,inView]=useInView();

  useEffect(() => {
    async function fetchData() {
      try{
        const offset=(page-1) * LIMIT_PER_PAGE;
        const itemData = await getAllItemAPI(offset);
        
        setItemList((prevItemList)=> {
          const newList = [...prevItemList,...itemData];
          return newList
        });
        
        const koreanNamesData = {};
        const itemImageUrls = {};
        const koreanItemDescriptionData = {};

        for (const item of itemData) {
          koreanNamesData[item.name] = await getKoreanItemAPI(item.name);
          itemImageUrls[item.name] = await getItemImageURL(item.name);
          koreanItemDescriptionData[item.name] = await getKoreanItemDescription(item.name);
        }

        setKoreanNames((prev)=>({...prev,...koreanNamesData}));
        setItemImageUrls((prev)=>({...prev,...itemImageUrls}));
        setKoreanItemDescription((prev)=>({...prev,...koreanItemDescriptionData}));

      } catch(error){
        console.error('Error:', error);
      }
    }

    fetchData();
  }, [page]);

    // 페이지 로드시 uploadItemData 함수 호출
    useEffect(() => {
      const uploadItemData = () => {
        if (inView) {
          setPage((prevItemPage) => prevItemPage + 1);
        }
      };
      uploadItemData();
    }, [inView]);

  return (
    <div className="font-custom">
      <Header />
      <div className="px-16 sm:grid sm:grid-cols-1 md:grid md:grid-cols-2 grid grid-cols-4 gap-4 mt-32">
        {itemList.map((item, index) => (
          <Item 
            key={index}
            item={item}
            koreanName={koreanNames[item.name]}
            imageUrl={itemImageUrls[item.name]}
            koreanItemDescription={koreanItemDescription[item.name]}
          />
        ))}
      </div>
      <div ref={ref}></div>
    </div>
  );
}

export default Tool;
