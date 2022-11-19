import React, { Dispatch, createContext, useReducer } from 'react';

import { Action } from './actions';
import { State, initialState, reducer } from './reducer';

export type Context = { state: State; dispatch: Dispatch<Action> };

export const AppContext = createContext<Context>({ state: initialState, dispatch: () => {} });

const ContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export default ContextProvider;
