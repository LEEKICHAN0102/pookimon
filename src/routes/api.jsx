import axios from 'axios';

// 포켓몬 API의 기본 URL
const baseURL = 'https://pokeapi.co/api/v2';

export async function getKoreanAPI(pokemonName) {
  try {
    const response = await axios.get(`${baseURL}/pokemon-species/${pokemonName}`);
    const koreanName = response.data.names.find(nameObj => nameObj.language.name === 'ko').name;
    console.log(koreanName);
    return koreanName;
  } catch (error) {
    console.error(`Error fetching ${pokemonName} data:`, error);
    throw error;
  }
}

export async function getAllPokemonAPI() {
  try {
    const response = await axios.get(`${baseURL}/pokemon?limit=20`); // 최대 1000개의 포켓몬을 가져옴
    const pokemonList = response.data.results;
    return pokemonList;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function getPokemonImageURL(pokemonName) {
  try {
    const response = await axios.get(`${baseURL}/pokemon/${pokemonName}`);
    const imageURL = response.data.sprites.versions['generation-v']["black-white"]['animated'].front_default;
    console.log(imageURL);
    return imageURL;
  } catch (error) {
    console.error(`Error fetching ${pokemonName} data:`, error);
    throw error;
  }
}

export async function getPokemonID(pokemonName) {
  try {
    const response = await axios.get(`${baseURL}/pokemon/${pokemonName}`);
    const id = response.data.id;
    console.log(id);
    return id;
  } catch(error) {
    console.error(`Error fetching ${pokemonName} data:`, error);
    throw error;
  }
}

export async function getPokemonType(pokemonName){
  try{
    const response = await axios.get(`${baseURL}/pokemon/${pokemonName}`);
    const data = response.data;

    // 포켓몬의 타입 정보를 추출
    const types = data.types.map(typeInfo => typeInfo.type.name);

    // 최대 2개의 타입만 반환
    const typeString = types.slice(0, 2).join(" | "); // 타입들을 쉼표와 공백으로 연결
    console.log(typeString);
    return typeString;
  } catch (error) {
    console.error(`Error fetching ${pokemonName} data:`, error);
    throw error;
  }
}

export async function getKoreanPokemonDescription(pokemonName) {
  try {
    // 한국어로 된 포켓몬 종(species) 정보를 가져옴
    const response = await axios.get(`${baseURL}/pokemon-species/${pokemonName}?language=ko`);
    const speciesData = response.data;

    // 포켓몬 설명 추출
    const descriptionArray = speciesData.flavor_text_entries.filter(entry => entry.language.name === 'ko');
    
    // 설명 배열을 하나의 문자열로 합치기
    const description = descriptionArray[0].flavor_text;

    return description;
  } catch (error) {
    console.error('Error fetching Pokémon description in Korean:', error);
    throw error;
  }
}

export async function getKoreanPokemonAbility(pokemonName){
  try{
    
  }catch(error){

  }
}

// 포켓몬의 이미지 URL을 받아오는 함수
// export async function searchPokemonAPI(pokemonName) {
//   try {
//     // 포켓몬 정보를 가져옴
//     const response = await axios.get(`${baseURL}/pokemon/${pokemonName}`);
//     const data = response.data;

//     // 이미지 URL 추출
//     const imageURL = data.sprites.front_default;

//     return imageURL;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error;
//   }
// }

export async function getBerryAPI(berryName){
  try{
    const response = await axios.get(`${baseURL}/berry/${berryName}`);
    const data = response.data;

    // 이미지 URL 추출
    const imageURL = data.sprites.front_default;

    return imageURL;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function getAllItemAPI(itemName){
  try {
    const response = await axios.get(`${baseURL}/item?limit=20`); // 최대 1000개의 포켓몬을 가져옴
    const itemList = response.data.results;
    return itemList;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function getKoreanItemAPI(itemName) {
  try {
    const response = await axios.get(`${baseURL}/item/${itemName}`);
    const koreanName = response.data.names.find(nameObj => nameObj.language.name === 'ko').name;
    console.log(koreanName);
    return koreanName;
  } catch (error) {
    console.error(`Error fetching ${itemName} data:`, error);
    throw error;
  }
}

export async function getKoreanItemDescription(itemName){
  try{
    const response = await axios.get(`${baseURL}/item/${itemName}`);
    const speciesData = response.data;

    const itemDescriptionArray = speciesData.flavor_text_entries.filter(entry => entry.language.name === 'ko');
    
    // 설명 배열을 하나의 문자열로 합치기
    const koreanItemDescription = itemDescriptionArray[0].text;

    console.log(koreanItemDescription);
    return koreanItemDescription;
  }catch (error){
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function getItemImageURL (itemName){
  try{
    const response = await axios.get(`${baseURL}/item/${itemName}`);
    const data = response.data;

    // 이미지 URL 추출
    const imageURL = data.sprites.default;

    return imageURL;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function getOfficialArtwork(pokemonName){
  try{
    const response = await axios.get(`${baseURL}/pokemon/${pokemonName}`);
    const data=response.data;

    const officialArtwork=data.sprites.other["official-artwork"].front_default;

    return officialArtwork;
  }catch (error){
    console.error('Error fetching data:', error);
    throw error;
  }
}