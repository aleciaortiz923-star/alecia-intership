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
    if (response.data && response.data.id) {
      return response.data;
    }
    console.warn(`API returned empty object for nftId: ${nftId}. Falling back to sample data.`);
    return {
      id: nftId,
      nftImage: "https://i.seadn.io/s/raw/files/2972b7aff49129f121d552b66b5c30f3.png?auto=format&dpr=1&w=1000",
      title: "Sample NFT - API Down",
      tag: "123",
      views: 100,
      likes: 50,
      description: "This is sample data because the API is currently returning an empty object. The real data will appear here when the API is fixed.",
      ownerId: 1,
      ownerImage: "https://i.seadn.io/s/raw/files/9a153b668d37c57893c59a39943f114a.png?auto=format&dpr=1&w=128",
      ownerName: "Sample Owner",
      creatorId: 2,
      creatorImage: "https://i.seadn.io/s/raw/files/4d11b51683498858273618a396263840.png?auto=format&dpr=1&w=128",
      creatorName: "Sample Creator",
      price: 2.5
    };
  } catch (error) {
    console.error(`Error fetching item details for nftId: ${nftId}:`, error);
    throw error;
  }
};

export default api;
