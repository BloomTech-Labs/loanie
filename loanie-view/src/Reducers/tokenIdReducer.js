// import { CHANGE_TOKEN_ID } from '../Actions';

export default function tokenIdReducer(id = '', action) {
  switch (action.type) {
    case 'CHANGE_TOKEN_ID':
      return Object.assign({}, id, {
        tokenId: action.tokenId,
      });
    default:
      return id;
  }
}
