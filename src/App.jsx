import React, { useState, useEffect } from "react";
import { 
  getAllPokemonAPI, 
  getPokemonImageURL, 
  getKoreanAPI, 
  getPokemonID, 
  getPokemonType,
  getKoreanPokemonType,
  getKoreanDescription,
  getOfficialArtwork,
  getKoreanPokemonDivision,
  getPokemonAbilities,
  getKoreanPokemonAbilities, 
  getShinyOfficialArtwork,
} from "./routes/api";
import Card from "./components/pokemonCard.jsx"; // Card 컴포넌트 임포트
import Header from "./components/header.jsx"; // Header 컴포넌트 임포트
import { useInView } from "react-intersection-observer";


function App() {
  const LIMIT_PER_PAGE = 20;

  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonId, setPokemonId] = useState({});
  const [pokemonType, setPokemonType] = useState({});
  const [pokemonAbilities, setPokemonAbilities] = useState({});
  const [koreanPokemonType,setKoreanPokemonType]=useState({});
  const [imageUrls, setImageUrls] = useState({});
  const [koreanNames, setKoreanNames] = useState({});
  const [koreanDescription,setKoreanDescription] = useState({});
  const [officialArtwork,setOfficialArtwork]=useState({});
  const [shinyArtwork , setShinyArtwork]=useState({});
  const [koreanDivision , setKoreanDivision]=useState({});
  const [koreanAbilities,setKoreanAbilities]=useState({});
  const [page, setPage] = useState(0);

  const [ref, inView] = useInView(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const offset = (page - 1) * LIMIT_PER_PAGE;
        const pokemonData = await getAllPokemonAPI(offset);

        // 기존 데이터와 새로운 데이터를 병합
        setPokemonList((prevList) => {
          const newList = [...prevList, ...pokemonData]; 
          return newList; 
        });

          // 나머지 데이터도 업데이트
          const id = {};
          const typeData = {};
          const urls = {};
          const koreanNamesData = {};
          const abilitiesData = {};
          const koreanPokemonTypesData = {};
          const koreanDescriptionData = {};
          const officialArtworkData = {};
          const shinyArtworkData= {};
          const koreanDivisionData = {};
          const koreanAbilitiesData={};

        for (const pokemon of pokemonData) {
          id[pokemon.name] = await getPokemonID(pokemon.name);
          typeData[pokemon.name] = await getPokemonType(pokemon.name);
          abilitiesData[pokemon.name]=await getPokemonAbilities(pokemon.name);
          koreanPokemonTypesData[pokemon.name] = await getKoreanPokemonType(pokemon.name);
          urls[pokemon.name] = await getPokemonImageURL(pokemon.name);
          koreanNamesData[pokemon.name] = await getKoreanAPI(pokemon.name);
          koreanDescriptionData[pokemon.name] = await getKoreanDescription(pokemon.name);
          officialArtworkData[pokemon.name] = await getOfficialArtwork(pokemon.name);
          shinyArtworkData[pokemon.name] = await getShinyOfficialArtwork(pokemon.name);
          koreanDivisionData[pokemon.name] = await getKoreanPokemonDivision(pokemon.name);
          koreanAbilitiesData[pokemon.name]=await getKoreanPokemonAbilities(pokemon.name);
        }

        setPokemonId((prev) => ({...prev, ...id}));
        setPokemonType((prev) => ({...prev, ...typeData}));
        setPokemonAbilities((prev) => ({...prev, ...abilitiesData}));
        setKoreanPokemonType((prev) => ({...prev, ...koreanPokemonTypesData}));
        setImageUrls((prev) => ({...prev, ...urls}));
        setKoreanNames((prev) => ({...prev, ...koreanNamesData}));
        setKoreanDescription((prev) => ({...prev, ...koreanDescriptionData}));
        setOfficialArtwork((prev) => ({...prev, ...officialArtworkData}));
        setShinyArtwork((prev)=>({...prev,...shinyArtworkData}));
        setKoreanDivision((prev) => ({...prev, ...koreanDivisionData}));
        setKoreanAbilities((prev) => ({...prev, ...koreanAbilitiesData}));

      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchData();

  }, [page]);


  // 페이지 로드시 uploadData 함수 호출
  useEffect(() => {
    const uploadData = () => {
      if (inView) {
        setPage((prevPage) => prevPage + 1);
      }
    };
    uploadData();
  }, [inView]);

  console.log({pokemonList,imageUrls})

  return (
    <div className="font-custom">
      <Header />
      <div className="grid grid-cols-4 gap-4 px-16">
        {pokemonList.map((pokemon, index) => (
          <Card
            key={index}
            pokemon={pokemon}
            pokemonId={pokemonId[pokemon.name]}
            pokemonAbilities={pokemonAbilities[pokemon.name]}
            imageUrl={imageUrls[pokemon.name]}
            koreanName={koreanNames[pokemon.name]} 
            pokemonType={pokemonType[pokemon.name]}
            koreanPokemonType={koreanPokemonType[pokemon.name]} 
            koreanDescription={koreanDescription[pokemon.name]}
            officialArtwork={officialArtwork[pokemon.name]}
            shinyArtwork={shinyArtwork[pokemon.name]}
            koreanDivision={koreanDivision[pokemon.name]}
            koreanAbilities={koreanAbilities[pokemon.name]}
          />
        ))}
      </div>
      <div ref={ref}></div>
    </div>
  );
}

export default App;
