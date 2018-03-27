import { CHANGE_TOKEN_ID } from "../Actions";

export default function tokenIdReducer(state = "", action) {
  switch (action.type) {
    case CHANGE_TOKEN_ID:
      return action.tokenId;

    default:
      return state;
  }
}
