import axios from 'axios';

/* 
  currently 
    API_KEY,
    TRANDING_GIF_URL,
    SEARCH_GIF_URL
  here for check the assignment, but after that will move on env file. 
 */
const API_KEY =  'Tj4b1ntgcCkvYIanPGffaaVqYOrOu8Kv';
const TRANDING_GIF_URL =`https://api.giphy.com/v1/gifs/trending`;
const SEARCH_GIF_URL = `https://api.giphy.com/v1/gifs/search`;

type GetTrandingData = {
  offset: number;
}
export const getTrandingData = async ( { offset }: GetTrandingData ) => {
  const response = await axios(TRANDING_GIF_URL, {
    params: {
      api_key: API_KEY,
      limit: 50,
      offset: offset ? offset : 0,
    }
  });
  return { response : response.data };
};

type GetSearchData = {
  offset: number;
  searchTerm: string;
}

export const getSearchData = async ( { searchTerm, offset}: GetSearchData ) => {
  const response = await axios(SEARCH_GIF_URL, {
    params: {
      api_key: API_KEY,
      q: searchTerm,
      limit: 50,
      offset: offset ? offset : 0,
    }
  });
  return { response : response.data };
};