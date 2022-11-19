import { Reducer } from 'react';

import Game from '../../models/Game';

import type { Action } from './actions';

export type State = {
  gamesList: Game[];
  activeGame: Game | null;
};

export const initialState: State = {
  gamesList: [],
  activeGame: null,
};

export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'SET_GAMES_LIST':
      return { ...state, gamesList: action.payload.gamesList };
    case 'SET_ACTIVE_GAME':
      return { ...state, activeGame: action.payload.activeGame };
    default:
      return state;
  }
};
