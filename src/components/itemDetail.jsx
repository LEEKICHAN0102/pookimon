import React,{ useState,useEffect} from "react";
import { Button, Modal } from 'flowbite-react';
import LazyLoad from "react-lazy-load";
import Loader from "./loader";

function ItemDetail({koreanName,imageUrl,koreanItemDescription }) {
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (openModal) {
      // 모달이 열렸을 때 body에 오버플로우 숨김 스타일 추가
      document.body.style.overflow = "hidden";
    } else {
      // 모달이 닫혔을 때 body 스타일 초기화
      document.body.style.overflow = "auto";
    }
  }, [openModal]);

  useEffect(() => {
    if (imageUrl) {
      setIsLoading(false);
    }
  }, [imageUrl]);

  return (
    <>
      <Button className={`text-black mb-4 bg-blue-100 w-24 h-6 rounded-lg hover:scale-105 transition-all ${
          isLoading ? "pointer-events-none opacity-50" : "" // isLoading이 true이면 비활성화 스타일 적용
        }`}
        onClick={() => {
          if (!isLoading) {
            props.setOpenModal("dismissible");
          }
        }}>상세 정보</Button>
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <Modal className="w-2/3 h-1/2  font-custom   md:w-3/5   rounded-sm m-auto" dismissible show={props.openModal === 'dismissible'} onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header className="px-2 py-2 flex items-end justify-end md:px-3 md:py-3  lg:px-4 lg:py-4"></Modal.Header>
        <Modal.Body>
          <div className="flex items-center justify-center text-sm md:text-lg lg:text-xl">{koreanName}</div>
          <LazyLoad className="flex items-center justify-center lg:mt-8 md:mt-2">
            {imageUrl ? (
              <img className="md:scale-125 lg:scale-150" src={imageUrl} alt="pokemonName" />
            ):(
              <Loader/>
            )}
          </LazyLoad>
          <div className="text-sm px-8  mt-4 md:text-lg lg:text-xl lg:mt-8 flex justify-center items-center md:px-24 lg:px-32">
            <p>{koreanItemDescription}</p>
          </div>
        </Modal.Body>
      </Modal>
      </div>
      )}
    </>
  )
}


export default ItemDetail;