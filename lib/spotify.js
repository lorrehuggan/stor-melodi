import axios from 'axios';
export const ID = process.env.REACT_APP_CLIENT_ID;
export const SECRET = process.env.REACT_APP_CLIENT_SECRET;

export const BASIC = Buffer.from(`${ID}:${SECRET}`).toString('base64');

// Spotify endpoints

export const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

export const GENRE_ENDPOINT = `https://api.spotify.com/v1/recommendations/available-genre-seeds`;

export const RECOMMENDATIONS_ENDPOINT = `https://api.spotify.com/v1/recommendations`;

export const ALBUM_ENDPOINT = `https://api.spotify.com/v1/albums/`;

export const ARTIST_ENDPOINT = `https://api.spotify.com/v1/artists/`;

export const NEW_RELEASE_ENDPOINT = `https://api.spotify.com/v1/browse/
new-releases`;

export const FEATURED_PLAYLIST_ENDPOINT = `https://api.spotify.com/v1/browse/featured-playlists?local=sv_UK`;

export const PLAYLIST_ENDPOINT = `https://api.spotify.com/v1/playlists/`;

export const AUDIO_FEATURES_ENDPOINT = `https://api.spotify.com/v1/audio-features/`;

// Get access to spotify api by posting client id and secret spotify
// returns a token which we use to call our endpoints.

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
