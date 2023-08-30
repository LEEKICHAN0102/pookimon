import axios from 'axios';

// 포켓몬 API의 기본 URL
const baseURL = 'https://pokeapi.co/api/v2';

export async function getAllPokemonAPI() {
  try {
    const response = await axios.get(`${baseURL}/pokemon?limit=40`); // 최대 1000개의 포켓몬을 가져옴
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
    const imageURL = response.data.sprites.front_default;
    console.log(imageURL);
    return imageURL;
  } catch (error) {
    console.error(`Error fetching ${pokemonName} data:`, error);
    throw error;
  }
}

// 포켓몬의 이미지 URL을 받아오는 함수
export async function searchPokemonAPI(pokemonName) {
  try {
    // 포켓몬 정보를 가져옴
    const response = await axios.get(`${baseURL}/pokemon/${pokemonName}`);
    const data = response.data;

    // 이미지 URL 추출
    const imageURL = data.sprites.front_default;

    return imageURL;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

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

export async function getItemsPI(itemName){
  try{
    const response = await axios.get(`${baseURL}/item/${itemName}`);
    const data = response.data;

    // 이미지 URL 추출
    const imageURL = data.sprites.front_default;

    return imageURL;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}