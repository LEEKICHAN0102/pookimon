import React, { useState, useEffect } from "react";
import { getAllPokemonAPI, getPokemonImageURL } from "./routes/api";
import Card from "./components/card.jsx"; // Card 컴포넌트 임포트
import Header from "./components/header.jsx"; // Header 컴포넌트 임포트

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const pokemonData = await getAllPokemonAPI();
        setPokemonList(pokemonData);

        const urls = {};
        for (const pokemon of pokemonData) {
          urls[pokemon.name] = await getPokemonImageURL(pokemon.name);
        }
        setImageUrls(urls);
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
          <Card key={index} pokemon={pokemon} imageUrl={imageUrls[pokemon.name]} />
        ))}
      </div>
    </div>
  );
}

export default App;
