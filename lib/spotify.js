import axios from 'axios';
export const ID = process.env.REACT_APP_CLIENT_ID;
export const SECRET = process.env.REACT_APP_CLIENT_SECRET;

export const BASIC = Buffer.from(`${ID}:${SECRET}`).toString('base64');

// spotify user authentication
const AUTH = 'https://accounts.spotify.com/authorize';

const CLIENT_ID = '9e8179478f2343e78de8a6f8f41b67eb';

const REDIRECT_URI = 'http//localhost:3000/';

const SCOPES = [
  'playlist-modify-private',
  'playlist-read-private',
  'user-read-private',
  'user-library-modify',
  'user-read-recently-played',
  'playlist-modify-public',
  'playlist-read-collaborative',
  'user-library-read',
  'user-top-read',
];

const SPACE_DELIMITER = '%20';

const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

export const AUTHENTICATION_ENDPOINT = `${AUTH}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;

// Spotify endpoints

export const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

export const GENRE_ENDPOINT = `https://api.spotify.com/v1/recommendations/available-genre-seeds`;

export const RECOMMENDATIONS_ENDPOINT = `https://api.spotify.com/v1/recommendations`;

export const ALBUM_ENDPOINT = `https://api.spotify.com/v1/albums/`; //{id}

export const ARTIST_ENDPOINT = `https://api.spotify.com/v1/artists/`;

export const NEW_RELEASE_ENDPOINT = `https://api.spotify.com/v1/browse/
new-releases`;

export const FEATURED_PLAYLIST_ENDPOINT = `https://api.spotify.com/v1/browse/featured-playlists?local=sv_UK`;

export const PLAYLIST_ENDPOINT = `https://api.spotify.com/v1/playlists/`; // {id}

export const NEW_RELEASES_ENDPOINT = `https://api.spotify.com/v1/browse/new-releases`;

export const AUDIO_FEATURES_ENDPOINT = `https://api.spotify.com/v1/audio-features/`; //{id}

export const GENRE_PLAYLIST_ENDPOINT = (id, limit) => {
  return `https://api.spotify.com/v1/browse/categories/${id}/playlists?limit=${limit}`;
};

export const GET_ACCESS_TOKEN = async () => {
  const token = await axios(TOKEN_ENDPOINT, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      Authorization: `Basic ${BASIC}`,
    },
    data: 'grant_type=client_credentials',
    method: 'POST',
  })
    .then((response) => response.data.access_token)
    .then((accessToken) => accessToken);

  return await token;
};
