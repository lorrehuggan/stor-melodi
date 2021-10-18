import React, { createContext, useContext, useReducer } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ initialState, reducer, children }) => (
  <AppContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </AppContext.Provider>
);

export const useAppStateValue = () => useContext(AppContext);
