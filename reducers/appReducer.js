export const initialState = {
  user: null,
  userToken: null,
  userPlaylists: null,
  userTopTrack: null,
  playing: false,
  itemPlaying: null,
  menuOpen: false,
};

export const types = {
  SET_USER: 'SET_USER',
  SET_USER_TOKEN: 'SET_USER_TOKEN',
  SET_USER_PLAYLISTS: 'SET_USER_PLAYLISTS',
  SET_USER_TOP_TRACKS: 'SET_USER_TOP_TRACKS',
  SET_USER_FOLLOWED_ARTIST: 'SET_USER_FOLLOWED_ARTIST',
  SET_USER_TOP_ARTIST: 'SET_USER_TOP_ARTIST',
  SET_PLAYING: 'SET_PLAYING',
  SET_ITEM_PLAYING: 'SET_ITEM_PLAYING',
  SET_MENU_OPEN: 'SET_MENU_OPEN',
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };
    case 'SET_PLAYING':
      return {
        ...state,
        playing: action.playing,
      };
    case 'SET_ITEM_PLAYING':
      return {
        ...state,
        itemPlaying: action.itemPlaying,
      };
    case 'SET_MENU_OPEN':
      return {
        ...state,
        menuOpen: action.menuOpen,
      };
    case 'SET_USER_TOKEN':
      return {
        ...state,
        userToken: action.userToken,
      };
    case 'SET_USER_PLAYLISTS':
      return {
        ...state,
        userPlaylists: action.userPlaylists,
      };
    case 'SET_USER_TOP_TRACKS':
      return {
        ...state,
        userTopTracks: action.userTopTracks,
      };
    case 'SET_USER_FOLLOWED_ARTIST':
      return {
        ...state,
        userFollowedArtist: action.userFollowedArtist,
      };
    case 'SET_USER_TOP_ARTIST':
      return {
        ...state,
        userTopArtist: action.userTopArtist,
      };
    default:
      return state;
  }
};

export default appReducer;
