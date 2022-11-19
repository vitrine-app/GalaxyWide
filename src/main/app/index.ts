import { MainHandler } from '../../ipc';

import getGamesList from './gamesList/getGamesList';
import playGogGame from './play/playGogGame';

export const recentlyPlayedGames: MainHandler<'recentlyPlayedGames'> = async () => {
  const gamesNumber = 100;

  const list = await getGamesList();

  return list
    .sort(({ lastPlayedDate: firstDate }, { lastPlayedDate: lastDate }) =>
      (firstDate ?? 0) < (lastDate ?? 0) ? 1 : -1,
    )
    .slice(0, gamesNumber);
};

export const playGame: MainHandler<'playGame'> = async (event, game) => {
  await playGogGame(game);
};
