import { GamePiece, GamePieceType, PieceType } from '../../../models/db/GamePiece';
import LastPlayedDate from '../../../models/db/LastPlayedDates';
import Game from '../../../models/Game';
import cache from '../../cache';
import sql from '../../db';
import {
  GET_GAME_PIECES_TYPES,
  GET_GAME_TIMES,
  GET_INSTALLED_KEYS,
  GET_LAST_PLAYED_DATES,
  GET_VISIBLE_GAME_PIECES,
} from '../queries';

const getGamesList = async (): Promise<Game[]> => {
  const cachedList = cache.get<Game[]>('gamesList');

  if (cachedList) {
    return cachedList;
  }

  const [gamePieceTypes, gamePieces, lastPlayedDates, gameTimes, installedGames] = await Promise.all([
    sql.db.all<GamePieceType[]>(GET_GAME_PIECES_TYPES),
    sql.db.all<GamePiece[]>(GET_VISIBLE_GAME_PIECES),
    sql.db.all<LastPlayedDate[]>(GET_LAST_PLAYED_DATES),
    sql.db.all<GameTime[]>(GET_GAME_TIMES),
    sql.db.all<{ releaseKey: string }[]>(GET_INSTALLED_KEYS),
  ]);

  const installedReleaseKeys = installedGames.map(({ releaseKey }) => releaseKey);
  const lastPlayedDatesRecord = lastPlayedDates.reduce<Record<string, Date>>(
    (acc, { gameReleaseKey, lastPlayedDate }) => ({ ...acc, [gameReleaseKey]: new Date(lastPlayedDate) }),
    {},
  );
  const minutesPlayed = gameTimes.reduce<Record<string, number>>(
    (acc, { releaseKey, minutesInGame }) => ({ ...acc, [releaseKey]: minutesInGame }),
    {},
  );

  const gamesList = Object.values(
    gamePieces.reduce<Record<string, Game>>((acc, gamePiece) => {
      const gamePieceType = gamePieceTypes.find(({ id }) => id === gamePiece.gamePieceTypeId)!.type;
      const game =
        acc[gamePiece.releaseKey] ??
        ({
          releaseKey: gamePiece.releaseKey,
          installed: installedReleaseKeys.includes(gamePiece.releaseKey),
          minutesPlayed: minutesPlayed[gamePiece.releaseKey] ?? 0,
          lastPlayedDate: lastPlayedDatesRecord[gamePiece.releaseKey] ?? null,
          developers: [] as string[],
          publishers: [] as string[],
          genres: [] as string[],
          themes: [] as string[],
          tags: [] as string[],
        } as Game);

      const piece = JSON.parse(gamePiece.value);

      switch (gamePieceType) {
        case PieceType.originalTitle: {
          game.name = piece.title;
          break;
        }
        case PieceType.originalImages: {
          game.backgroundImageUrl = piece.background;
          game.coverImageUrl = piece.verticalCover;
          break;
        }
        case PieceType.summary: {
          game.summary = piece.summary;
          break;
        }
        case PieceType.originalMeta: {
          game.criticsScore = piece.criticsScore;
          game.developers = piece.developers;
          game.publishers = piece.publishers;
          game.genres = piece.genres;
          game.themes = piece.themes;
          game.releaseDate = piece.releaseDate ? new Date(piece.releaseDate * 1000) : null;
          break;
        }
        case PieceType.originalSortingTitle: {
          game.sortingTitle = piece.title;
        }
      }

      if (!acc[gamePiece.releaseKey]) {
        acc[gamePiece.releaseKey] = game;
      }

      return acc;
    }, {}),
  );

  cache.set('gamesList', gamesList);

  return gamesList;
};

export default getGamesList;
