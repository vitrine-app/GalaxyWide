import Game from '../../models/Game';

type ActionReturn<T, P> = { type: T; payload: P };

export const setGamesList = (gamesList: Game[]): ActionReturn<'SET_GAMES_LIST', { gamesList: Game[] }> => ({
  type: 'SET_GAMES_LIST',
  payload: {
    gamesList,
  },
});
export const setActiveGame = (activeGame: Game): ActionReturn<'SET_ACTIVE_GAME', { activeGame: Game }> => ({
  type: 'SET_ACTIVE_GAME',
  payload: {
    activeGame,
  },
});

export type Action = ReturnType<typeof setGamesList> | ReturnType<typeof setActiveGame>;
