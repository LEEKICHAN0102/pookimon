import React,{ useState} from "react";
import { Button, Modal } from 'flowbite-react';
import colors from "../color";
import typeIcons from "../icon";

function Detail({koreanName,imageUrl,pokemonType,pokemonAbilities,koreanPokemonType,koreanDescription,officialArtwork,koreanDivision,koreanAbilities}) {
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };

  function getTypeColor(type) {
    return colors[type] || "#FFFFFF"; // 타입 정보가 없으면 기본 색상 사용
  }

  return (
    <>
      <Button className="text-black mb-4 bg-blue-100 w-24 h-6 rounded-lg hover:scale-105  transition-all" onClick={() => props.setOpenModal('default')}>상세 정보</Button>
      <Modal className="px-16 border-gray-300 border-2 font-custom w-1/2 h-4/5 bg-white  rounded-xl m-auto " show={props.openModal === 'default'} onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header className="flex items-center justify-center pt-8">{koreanName}</Modal.Header>
        <Modal.Body>
          <div className="flex items-center justify-center pt-4">
            <img src={imageUrl} alt="pokemonName" />
          </div>
          <div className="mt-4 flex justify-center items-center">
            <p>{koreanDivision}</p>
          </div>
          <div className="flex justify-center items-center mt-4">
          {pokemonType && pokemonType.length > 0 && koreanPokemonType && koreanPokemonType.length > 0
              ? pokemonType.map((type, index) => (
            <div
              key={index}
              style={{ backgroundColor: getTypeColor(type) }}
              className="flex justify-center items-center w-28 h-6 rounded-lg ml-2"
            >
              <img  src={typeIcons[type]} alt={type} className="w-3 h-3 mr-2" />
              <span className="text-sm mr-4" >{koreanPokemonType[index]}</span>
            </div>
            ))
            : null
          }
          </div>
          <div className="mt-8 flex justify-center items-center">
            <p>{koreanDescription}</p>
          </div>
          <div className="mt-8">
            <p>{koreanAbilities}</p>
          </div>
          <div className="flex justify-center items-center mt-8">
            <img src={officialArtwork} alt="pokemonName" />
          </div>
            <span className="flex justify-center items-center">- Official Artwork -</span>
        </Modal.Body>
      </Modal>
    </>
  )
}


export default Detail;