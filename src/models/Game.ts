type Game = {
  releaseKey: string;
  installed: boolean;
  minutesPlayed: number;
  lastPlayedDate: Date | null;
  name: string;
  developers: string[];
  publishers: string[];
  releaseDate: Date | null;
  genres: string[];
  summary: string | null;
  coverImageUrl: string | null;
  backgroundImageUrl: string | null;
  themes: string[];
  criticsScore: number | null;
  tags: string[];
  sortingTitle: string;
};

export default Game;
