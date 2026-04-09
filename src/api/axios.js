import axios from "axios";

const api = axios.create({
    baseURL: "https://us-central1-nft-cloud-functions.cloudfunctions.net",
    // baseURL: "http://localhost:5001/nft-cloud-functions/us-central1",
    timeout: 10000, // Optional: Set a timeout for requests
    headers: {
        "Content-Type": "application/json",
    },
});

export const getAuthors = async () => {
  try {
    const response = await api.get('/authors');
    return response.data;
  } catch (error) {
    console.error('Error fetching authors:', error);
    throw error;
  }
};

export const getAuthor = async (authorId) => {
  try {
    const response = await api.get(`/authors?author=${authorId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching author with id ${authorId}:`, error);
    throw error;
  }
};

export const getExploreItems = async (filter) => {
  try {
    const response = await api.get(`/explore${filter ? `?filter=${filter}` : ''}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching explore items:', error);
    throw error;
  }
};

export const getHotCollections = async () => {
  try {
    const response = await api.get('/hotCollections');
    return response.data;
  } catch (error) {
    console.error('Error fetching hot collections:', error);
    throw error;
  }
};

export const getNewItems = async () => {
  try {
    const response = await api.get('/newItems');
    return response.data;
  } catch (error) {
    console.error('Error fetching new items:', error);
    throw error;
  }
};

export const getTopSellers = async () => {
  try {
    const response = await api.get('/topSellers');
    return response.data;
  } catch (error) {
    console.error('Error fetching top sellers:', error);
    throw error;
  }
};

export const getItemDetails = async (nftId) => {
  try {
    const response = await api.get(`/itemDetails?id=${nftId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching item details for nftId: ${nftId}:`, error);
    throw error;
  }
};

export default api;
