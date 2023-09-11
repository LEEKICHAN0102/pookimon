import axios from 'axios';

// 포켓몬 API의 기본 URL
const baseURL = 'https://pokeapi.co/api/v2';

export async function getKoreanAPI(pokemonName) {
  try {
    const response = await axios.get(`${baseURL}/pokemon-species/${pokemonName}`);
    const koreanName = response.data.names.find(nameObj => nameObj.language.name === 'ko').name;
    return koreanName;
  } catch (error) {
    console.error(`Error fetching ${pokemonName} data:`, error);
    throw error;
  }
}

export async function getAllPokemonAPI(offset) {
  try {
    const response = await axios.get(`${baseURL}/pokemon?offset=${offset}&limit=20`); // 최대 1000개의 포켓몬을 가져옴
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
    return id;
  } catch(error) {
    console.error(`Error fetching ${pokemonName} data:`, error);
    throw error;
  }
}

export async function getPokemonType(pokemonName) {
  try {
    const response = await axios.get(`${baseURL}/pokemon/${pokemonName}`);
    const data = response.data;

    if (!data || !data.types || data.types.length === 0) {
      // 데이터가 없거나 타입 정보가 없는 경우 기본값 또는 에러 처리를 수행할 수 있습니다.
      return "Unknown Type"; // 또는 다른 기본값 설정
    }

    // 포켓몬의 타입 정보를 추출
    const types = data.types.map(typeInfo => typeInfo.type.name);

    // 최대 2개의 타입만 반환
    return types;
  } catch (error) {
    console.error(`Error fetching ${pokemonName} data:`, error);
    throw error;
  }
}

export async function getKoreanPokemonType (pokemonName){
  try {
    // 포켓몬 데이터 엔드포인트에 요청을 보냅니다.
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const data = response.data;

    // 포켓몬의 타입 정보를 추출합니다.
    const types = data.types.map((typeInfo) => {
      // 타입 정보의 URL로 이동합니다.
      return axios.get(typeInfo.type.url);
    });

    // 모든 타입 정보를 병렬로 가져옵니다.
    const typeResponses = await Promise.all(types);

    // 각 타입 정보에서 한국어로 된 이름을 찾습니다.
    const koreanTypes = typeResponses.map((typeResponse) => {
      const names = typeResponse.data.names;
      const koreanNameInfo = names.find((nameInfo) => nameInfo.language.name === 'ko');
      return koreanNameInfo ? koreanNameInfo.name : '번역 없음';
    });

    return koreanTypes;
  } catch (error) {
    console.error(`Error fetching ${pokemonName} data:`, error);
    throw error;
  }
}

export async function getKoreanDescription(pokemonName) {
  try {
    // 한국어로 된 포켓몬 종(species) 정보를 가져옴
    const response = await axios.get(`${baseURL}/pokemon-species/${pokemonName}?language=ko`);
    const speciesData = response.data;

    // 포켓몬 설명 추출
    const descriptionArray = speciesData.flavor_text_entries.filter(entry => entry.language.name === 'ko');
    
    // 설명 배열을 하나의 문자열로 합치기
    if (descriptionArray.length > 0) {
      const description = descriptionArray[0].flavor_text;
      return description;
    } else {
      // 'ko' 언어로 된 항목이 없을 때 처리
      console.error('No Korean description found for the Pokémon.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching Pokémon description in Korean:', error);
    throw error;
  }
}

export async function getKoreanPokemonDivision(pokemonName) {
  try {
    const response = await axios.get(`${baseURL}/pokemon-species/${pokemonName}`);
    const speciesData = response.data;

    const divisionArray = speciesData.genera.filter(entry => entry.language.name === 'ko');

    if (divisionArray.length > 0) {
      const division = divisionArray[0].genus;

      return division;
    } else {
      // 'ko' 언어로 된 항목이 없을 때 처리
      console.error('No Korean division found for the Pokémon.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching Pokémon genus in Korean:', error);
    throw error;
  }
}

export async function getPokemonAbilities(pokemonName){
  try{
    const response = await axios.get(`${baseURL}/pokemon/${pokemonName}`);
    const data = response.data;

    if (!data || !data.types || data.types.length === 0) {
      // 데이터가 없거나 타입 정보가 없는 경우 기본값 또는 에러 처리를 수행할 수 있습니다.
      return "Unknown Abilities"; // 또는 다른 기본값 설정
    }

    const pokemonAbilities = data.abilities.map(abilityInfo => abilityInfo.ability.name);
    // 최대 2개의 타입만 반환
    return pokemonAbilities;
  }catch(error){
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function getKoreanPokemonAbilities(pokemonName){
  try{
    const response = await axios.get(`${baseURL}/pokemon/${pokemonName}`);
    const data = response.data;

    if (!data || !data.types || data.types.length === 0) {
      // 데이터가 없거나 타입 정보가 없는 경우 기본값 또는 에러 처리를 수행할 수 있습니다.
      return "Unknown Abilities"; // 또는 다른 기본값 설정
    }

    const pokemonAbilities = data.abilities.map((abilityInfo) => {
      // 능력 정보의 URL로 이동합니다.
      return axios.get(abilityInfo.ability.url);
    });

    // 모든 능력 정보를 병렬로 가져옵니다.
    const AbilitiesResponses = await Promise.all(pokemonAbilities);

    // 각 능력 정보에서 한국어로 된 이름을 찾습니다.
    const koreanAbilities = AbilitiesResponses.map((abilityResponse) => {
      const names = abilityResponse.data.names;
      const koreanNameInfo = names.find((nameInfo) => nameInfo.language.name === 'ko');
      return koreanNameInfo ? koreanNameInfo.name : '번역 없음';
    });
    
    return koreanAbilities;
  }catch(error){
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

export async function getAllItemAPI(offset){
  try {
    const response = await axios.get(`${baseURL}/item?offset=${offset}&limit=20`); // 최대 1000개의 포켓몬을 가져옴
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

export async function getShinyOfficialArtwork(pokemonName){
  try{
    const response = await axios.get(`${baseURL}/pokemon/${pokemonName}`);
    const data=response.data;

    const shinyArtwork=data.sprites.other["official-artwork"].front_shiny;

    return shinyArtwork;
  }catch (error){
    console.error('Error fetching data:', error);
    throw error;
  }
}