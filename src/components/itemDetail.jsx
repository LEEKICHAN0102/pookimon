import React,{ useState} from "react";
import { Button, Modal } from 'flowbite-react';
import LazyLoad from "react-lazy-load";
import Loader from "./loader";

function ItemDetail({koreanName,imageUrl,koreanItemDescription }) {
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };

  return (
    <>
      <Button className="text-black mb-4 bg-blue-400 w-24 h-6 rounded-lg hover:scale-105  transition-all" onClick={() => props.setOpenModal('dismissible')}>상세 정보</Button>
      <Modal className="font-custom w-1/2 h-1/3 bg-white border-gray-400 border-4 rounded-xl m-auto" dismissible show={props.openModal === 'dismissible'} onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header className="flex items-end justify-end px-4 py-4"></Modal.Header>
        <Modal.Body>
          <div className="flex items-center justify-center">{koreanName}</div>
          <LazyLoad className="flex items-center justify-center mt-4 ">
            {imageUrl ? (
              <img className="w-16 h-16" src={imageUrl} alt="pokemonName" />
            ):(
              <Loader/>
            )}
          </LazyLoad>
          <div className="mt-4 flex justify-center items-center px-32">
            <p>{koreanItemDescription}</p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}


export default ItemDetail;