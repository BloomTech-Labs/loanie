// import axios from 'axios';
// export default const CHANGE_TOKEN_ID = 'CHANGE_TOKEN_ID';
export const LINTER = 'LINTER';

export default function getTokenId(tokenId) {
  'CHANGE_TOKEN_ID', tokenId;
}

export const blah = tokenId => ({
  type: 'CHANGE_TOKEN_ID',
  tokenId,
});
