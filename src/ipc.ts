import { IpcMainInvokeEvent } from 'electron';

import Game from './models/Game';

export type MainHandler<T extends keyof PreloadApi> = (
  event: IpcMainInvokeEvent,
  ...args: Parameters<PreloadApi[T]>
) => ReturnType<PreloadApi[T]>;

export type PreloadApi = {
  playGame: (game: Game) => Promise<void>;
  recentlyPlayedGames: () => Promise<Game[]>;
};
