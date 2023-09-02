import React, { useState, useEffect } from "react";
import { getAllPokemonAPI, getPokemonImageURL, getKoreanAPI,getPokemonID, getPokemonType } from "./routes/api";
import Card from "./components/pokemonCard.jsx"; // Card 컴포넌트 임포트
import Header from "./components/header.jsx"; // Header 컴포넌트 임포트

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonId, setPokemonId]= useState({});
  const [pokemonType, setPokemonType] = useState({});
  const [imageUrls, setImageUrls] = useState({});
  const [koreanNames, setKoreanNames] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const pokemonData = await getAllPokemonAPI();
        setPokemonList(pokemonData);

        const id = {};
        for (const pokemon of pokemonData) {
          id[pokemon.name]= await getPokemonID(pokemon.name);
        }
        setPokemonId(id);

        const typeData = {}; // 타입 데이터를 저장할 객체

        // 각 포켓몬의 타입 정보를 가져와서 typeData에 저장
        for (const pokemon of pokemonData) {
          typeData[pokemon.name] = await getPokemonType(pokemon.name);
        }
        setPokemonType(typeData);

        const urls = {};
        for (const pokemon of pokemonData) {
          urls[pokemon.name] = await getPokemonImageURL(pokemon.name);
        }
        setImageUrls(urls);

        const koreanNamesData = {};
        for (const pokemon of pokemonData) {
          koreanNamesData[pokemon.name] = await getKoreanAPI(pokemon.name);
        }
        setKoreanNames(koreanNamesData);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <div className="grid grid-cols-4 gap-4">
        {pokemonList.map((pokemon, index) => (
          <Card
            key={index}
            pokemon={pokemon}
            pokemonId={pokemonId[pokemon.name]}
            imageUrl={imageUrls[pokemon.name]}
            koreanName={koreanNames[pokemon.name]} // 한국어 이름 전달
            pokemonType={pokemonType[pokemon.name]} // 타입 정보 전달
          />
        ))}
      </div>
    </div>
  );
}

export default App;
