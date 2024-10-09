// src/utils/comicVineApi.ts
import axios from 'axios';

const COMIC_VINE_BASE_URL = 'https://comicvine.gamespot.com/api';
const API_KEY = process.env.COMIC_VINE_API_KEY;

export const fetchComicMetadata = async (title: string) => {
  try {
    const response = await axios.get(`${COMIC_VINE_BASE_URL}/issues/`, {
      params: {
        api_key: API_KEY,
        format: 'json',
        filter: `name:${title}`,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching comic metadata from Comic Vine:', error);
    throw new Error('Failed to fetch comic metadata');
  }
};
