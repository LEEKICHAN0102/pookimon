import React,{ useState,useEffect} from "react";
import { Button, Modal } from 'flowbite-react';
import colors from "../color";
import typeIcons from "../icon";
import LazyLoad from "react-lazy-load";
import Loader from "./loader";
import Toggle from "./toggle";

function Detail({ koreanName,imageUrl,pokemonType,pokemonAbilities,koreanPokemonType,koreanDescription,officialArtwork,koreanDivision,koreanAbilities,shinyArtwork}) {
  const [openModal, setOpenModal] = useState();
  const [isShiny, setIsShiny] = useState(false);
  const props = { openModal, setOpenModal };

  useEffect(() => {
    if (openModal) {
      // 모달이 열렸을 때 body에 오버플로우 숨김 스타일 추가
      document.body.style.overflow = "hidden";
    } else {
      // 모달이 닫혔을 때 body 스타일 초기화
      document.body.style.overflow = "auto";
    }
  }, [openModal]);

  // Toggle 클릭 이벤트 핸들러
  const handleToggleClick = () => {
    // 현재 상태의 반대로 Toggle 상태 변경
    setIsShiny(!isShiny);
  };

  const currentArtwork = isShiny ? shinyArtwork : officialArtwork;

  function getTypeColor(type) {
    return colors[type] || "#FFFFFF"; // 타입 정보가 없으면 기본 색상 사용
  }
  
  return (
    <>
      <Button
        className="text-black mb-4 bg-blue-100 w-24 h-6 rounded-lg hover:scale-105  transition-all"
        onClick={() => {
        props.setOpenModal('dismissible');
        }}
      >
        상세 정보
      </Button>
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
        <Modal className="border-gray-300 border-2 font-custom w-1/2 h-4/5 bg-white  rounded-xl m-auto"
        dismissible show={props.openModal === 'dismissible' } onClose={() => {
          props.setOpenModal(undefined);
          setIsShiny(false);
        }}>
          <Modal.Header className="flex items-end justify-end pt-8 pr-8"></Modal.Header>
            <Modal.Body className="mt-8">
            <div className="flex justify-center items-center">{koreanName}</div>
            <LazyLoad className="flex items-center justify-center pt-4">
              <img src={imageUrl} alt="pokemonName" />
            </LazyLoad>
            <div className="mt-4 flex justify-center items-center" >
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
            <div className="mt-8 flex justify-center items-center px-36">
              <p>{koreanDescription}</p>
            </div>
            <div className="mt-8 flex justify-center items-center">
              <div className="mt-8 flex justify-center items-center w-1/3 h-8 rounded-2xl bg-gray-300">
                <span className="font-semibold">{koreanName}</span>
                의 특성
              </div>
            </div>
            <div className="mt-8 px-36">
              {koreanAbilities.map((ability, index) => (
                <div key={index}>
                  <p><span className="text-lg font-semibold">{ability.name}</span>: {ability.description}</p>
                </div>
              ))}
            </div>
            <Toggle className="flex justify-end items-end px-36 mt-8" onClick={handleToggleClick} />
            <LazyLoad className="flex justify-center items-center">
              {currentArtwork ? (
              <img src={currentArtwork} alt="pokemonName" />
                ) : (
              <Loader />
              )}
            </LazyLoad>
              <span className="flex justify-center items-center">- Official Artwork -</span>
          </Modal.Body>
        </Modal>
        </div>
      )}
    </>
  )
}


export default Detail;