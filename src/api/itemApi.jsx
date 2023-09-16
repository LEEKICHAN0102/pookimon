import axios from 'axios';

// 포켓몬 API의 기본 URL
const baseURL = 'https://pokeapi.co/api/v2';

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
    
    // 한국어 이름을 찾아옴, 없을 경우 영어를 반환
    const koreanNameObj = response.data.names.find((nameObj) => nameObj.language.name === 'ko');
    const EnglishNameObj = response.data.names.find((nameObj) => nameObj.language.name === 'en');
    const koreanName = koreanNameObj ? koreanNameObj.name : EnglishNameObj.name;

    return koreanName;
  } catch (error) {
    console.error(`Error fetching ${itemName} data:`, error);
    throw error;
  }
}

export async function getKoreanItemDescription(itemName) {
  try {
    const response = await axios.get(`${baseURL}/item/${itemName}`);
    const speciesData = response.data;

    // speciesData가 undefined일 경우에 대한 오류 처리
    if (!speciesData || !speciesData.flavor_text_entries) {
      throw new Error('아이템 데이터를 찾을 수 없습니다.');
    }

    // 한국어 번역을 찾거나 없는 경우 'en' (영어) 번역을 찾음
    const koreanItemDescriptionEntry = speciesData.flavor_text_entries.find(
      (entry) => entry.language.name === 'ko'
    ) || speciesData.flavor_text_entries.find((entry) => entry.language.name === 'en');

    // 해당 번역이 없을 경우에 대한 오류 처리
    if (!koreanItemDescriptionEntry) {
      throw new Error('아이템에 한국어 또는 영어 번역이 없습니다.');
    }

    // 설명을 가져오기
    const koreanItemDescription = koreanItemDescriptionEntry.text;

    return koreanItemDescription;
  } catch (error) {
    console.error(`Error fetching ${itemName} data:`, error);
    throw error; // 더 자세한 오류 정보를 사용자에게 전달
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