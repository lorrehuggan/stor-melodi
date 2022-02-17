import axios from 'axios';
export const ID = process.env.REACT_APP_CLIENT_ID;
export const SECRET = process.env.REACT_APP_CLIENT_SECRET;

export const BASIC = Buffer.from(`${ID}:${SECRET}`).toString('base64');

const SPOTIFY_API = `https://api.spotify.com/v1/`;

// spotify user authentication
const AUTH = 'https://accounts.spotify.com/authorize';

const CLIENT_ID = '9e8179478f2343e78de8a6f8f41b67eb';

const REDIRECT_URI = {
  dev: 'http://localhost:3000/',
  prod: 'https://www.stormelodi.com/',
};

const SCOPES = [
  'playlist-modify-private',
  'playlist-read-private',
  'playlist-modify-public',
  'playlist-read-collaborative',
  'user-read-private',
  'user-library-modify',
  'user-read-recently-played',
  'user-library-read',
  'user-top-read',
  'user-read-currently-playing',
];

const SPACE_DELIMITER = '%20';

const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

export const AUTHENTICATION_ENDPOINT = `${AUTH}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI.prod}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;

export const GET_URL_RESPONSE_TOKEN = () => {
  // Pull access token from url returned by spotify
  return (
    window.location.hash
      // chop string up
      .substring(1)
      //split string at & symbol
      .split('&')
      //reduce string and decode
      .reduce((initial, item) => {
        let parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);
        return initial;
      }, {})
  );
};

// Spotify endpoints

export const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

export const GENRE_ENDPOINT = `${SPOTIFY_API}recommendations/available-genre-seeds`;

export const RECOMMENDATIONS_ENDPOINT = `${SPOTIFY_API}recommendations`;

export const ALBUM_ENDPOINT = `${SPOTIFY_API}albums/`; //{id}

export const ARTIST_ENDPOINT = `${SPOTIFY_API}artists/`;

export const NEW_RELEASE_ENDPOINT = `${SPOTIFY_API}browse/new-releases`;

export const FEATURED_PLAYLIST_ENDPOINT = `${SPOTIFY_API}browse/featured-playlists?local=sv_UK`;

export const PLAYLIST_ENDPOINT = `${SPOTIFY_API}playlists/`; // {id}

export const NEW_RELEASES_ENDPOINT = `${SPOTIFY_API}browse/new-releases`;

export const AUDIO_FEATURES_ENDPOINT = `${SPOTIFY_API}audio-features/`; //{id}

export const BROWSE_CATEGORIES_ENDPOINT = `${SPOTIFY_API}browse/categories`;

export const GENRE_PLAYLIST_ENDPOINT = (id, limit) => {
  return `${SPOTIFY_API}browse/categories/${id}/playlists?limit=${limit}`;
};

export const GET_TRACK_FEATURES_ENDPOINT = `${SPOTIFY_API}audio-features/`;

export const CHECK_ALBUM_SAVED_ENDPOINT = `${SPOTIFY_API}me/albums/contains/`;

export const SAVE_ALBUM_ENDPOINT = `${SPOTIFY_API}me/albums/`;

// USER ENDPOINTS ---->
export const GET_USER_PLAYLISTS_ENDPOINT = (id) => {
  return `${SPOTIFY_API}users/${id}/playlists
  `;
};

export const GET_USER_TOP_TRACKS = `${SPOTIFY_API}me/top/tracks`;

export const GET_USER_TOP_ARTIST = `${SPOTIFY_API}me/top/artists`;

export const GET_USER_ENDPOINT = `${SPOTIFY_API}me`;

export const GET_USER_FOLLOWED_ARTIST = `${SPOTIFY_API}me/following?type=artist`;

// Get spotify access token function
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
