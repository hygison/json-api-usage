export interface ActiveUserInterface {
  userId: string;
  email: string;
  tokenId: string;
  iat?: number;
  exp?: number;
}
