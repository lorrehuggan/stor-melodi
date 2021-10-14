import axios from 'axios';
export const ID = process.env.REACT_APP_CLIENT_ID;
export const SECRET = process.env.REACT_APP_CLIENT_SECRET;

export const BASIC = Buffer.from(`${ID}:${SECRET}`).toString('base64');

export const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

export const GENRE_ENDPOINT =
  'https://api.spotify.com/v1/recommendations/available-genre-seeds';

export const RECOMMENDATIONS_ENDPOINT = `https://api.spotify.com/v1/recommendations?seed_genres=`;

export const ALBUM_ENDPOINT = `https://api.spotify.com/v1/albums/`;

export const GET_ACCESS_TOKEN = async () => {
  const token = await axios(TOKEN_ENDPOINT, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${BASIC}`,
    },
    data: 'grant_type=client_credentials',
    method: 'POST',
  })
    .then((response) => response.data.access_token)
    .then((accessToken) => accessToken);

  return await token;
};
