import React,{ useState} from "react";
import { Button, Modal } from 'flowbite-react';

function ItemDetail({koreanName,imageUrl,koreanItemDescription }) {
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };

  return (
    <>
      <Button className="text-black mb-4 bg-blue-400 w-24 h-6 rounded-lg hover:scale-105  transition-all" onClick={() => props.setOpenModal('default')}>상세 정보</Button>
      <Modal className="font-custom w-1/2 h-1/4 bg-white border-gray-400 border-4 rounded-xl m-auto" show={props.openModal === 'default'} onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header className="flex items-center justify-center pt-8">{koreanName}</Modal.Header>
        <Modal.Body>
          <div className="flex items-center justify-center pt-4">
            <img src={imageUrl} alt="pokemonName" />
          </div>
          <div className="mt-4 flex justify-center items-center">
            <p>{koreanItemDescription}</p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}


export default ItemDetail;