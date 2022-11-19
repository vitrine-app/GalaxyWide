import { execFile as cbExecFile } from 'child_process';
import { promisify } from 'util';

import Game from '../../../models/Game';

const execFile = promisify(cbExecFile);

const playGogGame = async (game: Game): Promise<void> => {
  await execFile('gog.exe', ['/command=runGame', `/gameId=${game.releaseKey}`]);
};

export default playGogGame;
