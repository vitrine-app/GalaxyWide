export enum PieceType {
  myAchievementsCount = 'myAchievementsCount',
  myRating = 'myRating',
  allGameReleases = 'allGameReleases',
  dlcs = 'dlcs',
  media = 'media',
  meta = 'meta',
  originalImages = 'originalImages',
  originalMeta = 'originalMeta',
  originalTitle = 'originalTitle',
  summary = 'summary',
  title = 'title',
  osCompatibility = 'osCompatibility',
  myFriendsActivity = 'myFriendsActivity',
  friendsOwning = 'friendsOwning',
  changelog = 'changelog',
  goodies = 'goodies',
  isPreorder = 'isPreorder',
  productLinks = 'productLinks',
  sortingTitle = 'sortingTitle',
  originalSortingTitle = 'originalSortingTitle',
  isEarlyAccess = 'isEarlyAccess',
}

export type GamePieceType = {
  id: number;
  type: PieceType;
};

export type GamePiece = {
  releaseKey: string;
  gamePieceTypeId: number;
  userId: number;
  value: string;
};
