import { contextBridge, ipcRenderer } from 'electron';

import { PreloadApi } from '../ipc';
import Game from '../models/Game';

const exposeApi = (api: PreloadApi): void => {
  contextBridge.exposeInMainWorld('electron', api);
};

exposeApi({
  // Renderer -> Main
  playGame: async (game: Game) => {
    await ipcRenderer.invoke('play-game', game);
  },
  recentlyPlayedGames: async () => {
    return ipcRenderer.invoke('get-recently-played-games');
  },
});
