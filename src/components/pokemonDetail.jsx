import React,{ useState} from "react";
import { Button, Modal } from 'flowbite-react';

function Detail({koreanName,imageUrl,pokemonType,koreanDescription,officialArtwork}) {
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };

  return (
    <>
      <Button className="text-black mb-4 bg-blue-400 w-24 h-6 rounded-lg hover:scale-105  transition-all" onClick={() => props.setOpenModal('default')}>상세 정보</Button>
      <Modal className="font-custom w-1/2 h-4/5 bg-white border-gray-400 border-4 rounded-xl m-auto" show={props.openModal === 'default'} onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header className="flex items-center justify-center pt-8">{koreanName}</Modal.Header>
        <Modal.Body>
          <div className="flex items-center justify-center pt-4">
            <img src={imageUrl} alt="pokemonName" />
          </div>
          <div className="flex bg-blue-200 h-8 rounded justify-center items-center mt-4">
            <span className=" text-sm">{pokemonType}</span>
          </div>
          <div className="mt-4 flex justify-center items-center">
            <p>{koreanDescription}</p>
          </div>
          <div>
          <img src={officialArtwork} alt="pokemonName" />
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}


export default Detail;