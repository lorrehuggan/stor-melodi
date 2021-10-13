export const ID = process.env.REACT_APP_CLIENT_ID;
export const SECRET = process.env.REACT_APP_CLIENT_SECRET;
export const TOKEN = process.env.REACT_APP_TOKEN;

export const basic = Buffer.from(`${ID}:${SECRET}`).toString('base64');
export const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

export const GENRE_ENDPOINT =
  'https://api.spotify.com/v1/recommendations/available-genre-seeds';

export const getAccessToken = async () => {
  const token = await fetch(TOKEN_ENDPOINT, {
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: 'grant_type=client_credentials',
    method: 'POST',
  }).then((response) => response.json());
  return token;
};
