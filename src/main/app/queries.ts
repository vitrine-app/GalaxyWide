export const GET_GAME_PIECES_TYPES = `
  SELECT * FROM GamePieceTypes
`;

export const GET_VISIBLE_GAME_PIECES = `
  SELECT GamePieces.* FROM GamePieces
  JOIN UserReleaseProperties ON GamePieces.releaseKey = UserReleaseProperties.releaseKey
  WHERE UserReleaseProperties.isHidden = 0
 `;

export const GET_INSTALLED_KEYS = `
  SELECT platforms.name || '_' || InstalledExternalProducts.productId AS releaseKey FROM InstalledExternalProducts
  JOIN Platforms ON InstalledExternalProducts.platformId = Platforms.id
  UNION
  SELECT 'gog_' || productId FROM InstalledProducts
  UNION
  SELECT gameReleaseKey FROM PlayTasks WHERE gameReleaseKey LIKE 'generic_%'
`;

export const GET_LAST_PLAYED_DATES = `
  SELECT * FROM LastPlayedDates
`;

export const GET_GAME_TIMES = `
  SELECT * FROM GameTimes
`;
