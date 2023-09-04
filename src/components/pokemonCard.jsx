import React,{useEffect,useState} from "react";
import { getAllPokemonAPI,getKoreanPokemonDescription,getOfficialArtwork } from "../routes/api";
import Detail from "./pokemonDetail";

function Card({pokemon,pokemonId,imageUrl,koreanName,pokemonType}){
  const [pokemonList, setPokemonList] = useState([]);
  const [koreanDescription,setKoreanDescription] = useState({});
  const [officialArtwork,setOfficialArtwork]=useState({});

  useEffect(()=>{
    async function fetchData(){
      try{
        const pokemonData = await getAllPokemonAPI();
        setPokemonList(pokemonData);

        const koreanDescriptionData={};
        for (const pokemon of pokemonData){
          koreanDescriptionData[pokemon.name]=await getKoreanPokemonDescription(pokemon.name);
        }
        setKoreanDescription(koreanDescriptionData);

        const officialArtworkData={};
        for (const pokemon of pokemonData){
          officialArtworkData[pokemon.name]=await getOfficialArtwork(pokemon.name);
        }
        setOfficialArtwork(officialArtworkData);
      }catch(error){
        console.error('Error:', error);
      }
    }
    fetchData();
  },[]);

  return(
    <div  className="flex flex-col  rounded-xl border-4 border-blue-200 w-full h-56 cursor-pointer">
      <div className="flex bg-blue-200 w-full h-8 rounded justify-between items-center px-4">
        <span className="text-sm">{`no.${pokemonId}`}</span>
        <span className=" text-32">{koreanName}</span>
      </div>
      <div className="flex items-center justify-center m-auto hover:scale-125 transition-all">
        <img src={imageUrl} alt={pokemon.name} />
      </div>
      <div className="flex justify-center">
        <Detail
          koreanName={koreanName}
          imageUrl={imageUrl}
          pokemonType={pokemonType}
          koreanDescription={koreanDescription[pokemon.name]}
          officialArtwork={officialArtwork[pokemon.name]}
        />
      </div>
      <div className="flex bg-blue-200 w-full h-8 rounded justify-center items-center">
        <span className=" text-sm">{pokemonType}</span>
      </div>
    </div>
  )
}

export default Card;