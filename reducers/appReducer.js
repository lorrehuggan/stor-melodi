export const initialState = {
  user: null,
  userToken: null,
  userPlaylists: null,
  playing: false,
  itemPlaying: null,
};

export const types = {
  SET_USER: 'SET_USER',
  SET_USER_TOKEN: 'SET_USER_TOKEN',
  SET_USER_PLAYLISTS: 'SET_USER_PLAYLISTS',
  SET_PLAYING: 'SET_PLAYING',
  SET_ITEM_PLAYING: 'SET_ITEM_PLAYING',
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
    default:
      return state;
  }
};

export default appReducer;
