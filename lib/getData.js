import { GET_ACCESS_TOKEN } from './spotify';

export const getData = async (url, token) => {
  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.data;
    return data;
  } catch (error) {
    console.log({ error: error.message });
  }
};
