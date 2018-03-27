export const CHANGE_TOKEN_ID = 'CHANGE_TOKEN_ID';

export const changeTokenId = tokenId => ({
  type: CHANGE_TOKEN_ID,
  tokenId,
});
