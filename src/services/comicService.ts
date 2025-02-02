import axios from 'axios';

const BASE_URL = '/api/comics';

export const fetchComics = async (): Promise<any[]> => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching comics:', error);
    throw new Error('Failed to fetch comics');
  }
};

export const addComic = async (comic: { title: string; issueNumber: number; publisher?: string; condition?: string; cgcGrade?: number; purchasePrice?: number; notes?: string; }): Promise<any> => {
  try {
    const response = await axios.post(BASE_URL, comic);
    return response.data;
  } catch (error) {
    console.error('Error adding comic:', error);
    throw new Error('Failed to add comic');
  }
};

export const updateComic = async (comic: { id: number; title?: string; issueNumber?: number; publisher?: string; condition?: string; cgcGrade?: number; purchasePrice?: number; notes?: string; }): Promise<any> => {
  try {
    const response = await axios.put(BASE_URL, comic);
    return response.data;
  } catch (error) {
    console.error('Error updating comic:', error);
    throw new Error('Failed to update comic');
  }
};

export const deleteComic = async (id: number): Promise<any> => {
  try {
    const response = await axios.delete(BASE_URL, { data: { id } });
    return response.data;
  } catch (error) {
    console.error('Error deleting comic:', error);
    throw new Error('Failed to delete comic');
  }
};