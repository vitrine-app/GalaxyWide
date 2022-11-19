import path from 'path';

import { BrowserWindow, app, ipcMain } from 'electron';

import { recentlyPlayedGames } from './app';
import { openDatabase } from './db';

const createWindow = async (): Promise<BrowserWindow> => {
  const window = new BrowserWindow({
    fullscreen: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  ipcMain.handle('get-recently-played-games', recentlyPlayedGames);

  await window.loadFile(path.join(__dirname, 'index.html'));

  if (process.env.NODE_ENV !== 'production') {
    window.webContents.openDevTools();
  }

  return window;
};

(async (): Promise<void> => {
  await Promise.all([openDatabase(), app.whenReady()]);

  await createWindow();
})();
