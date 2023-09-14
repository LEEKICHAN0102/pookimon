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
        <Modal className="w-4/5 h-4/5 border-gray-300 border-2 font-custom md:w-2/3 md:h-4/5 lg:w-1/2 lg:h-4/5 bg-white  rounded-xl m-auto"
        dismissible show={props.openModal === 'dismissible' } onClose={() => {
          props.setOpenModal(undefined);
          setIsShiny(false);
        }}>
          <Modal.Header className="flex items-end justify-end pt-8 pr-8"></Modal.Header>
            <Modal.Body className="sm:mt-4 md:mt-6 lg:mt-8">
            <div className="flex justify-center items-center md:mb-2 lg:mb-4">{koreanName}</div>
            <LazyLoad className="flex items-center justify-center pt-4">
              <img src={imageUrl} alt="pokemonName" className="md:scale-125 lg:scale-150"/>
            </LazyLoad>
            <div className="mt-4 flex justify-center items-center md:mt-6 lg:mt-8" >
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
            <div className="px-4 mt-4 md:mt-6 lg:mt-8 flex justify-center items-center md:text-sm md:px-28 lg:px-36">
              <p>{koreanDescription}</p>
            </div>
            <div className="text-xs mt-4  lg-mt-8 flex justify-center items-center md:text-md lg:text-lg">
              <div className="lg:mt-8 md:mt-6 mt-4 flex justify-center items-center w-1/3 h-8 rounded-2xl bg-gray-300">
                <span className="font-semibold">{koreanName}</span>
                의 특성
              </div>
            </div>
            <div className="mt-8 md:px-24 lg:px-36">
              {koreanAbilities.map((ability, index) => (
                <div key={index}>
                  <p className="text-sm px-4 md:text-md lg:text-lg"><span className="text-sm md:text-md lg:text-lg font-semibold">{ability.name}</span>: {ability.description}</p>
                </div>
              ))}
            </div>
            <Toggle className="px-4 flex justify-end items-end md:px-24 lg:px-36 mt-8" onClick={handleToggleClick} />
            <LazyLoad className="flex justify-center items-center">
              {currentArtwork ? (
              <img  src={currentArtwork} alt="pokemonName" className="w-[50%] sm:w-1/2 md:w-55 lg:w-3/4"/>
                ) : (
              <Loader />
              )}
            </LazyLoad>
          </Modal.Body>
        </Modal>
        </div>
      )}
    </>
  )
}


export default Detail;