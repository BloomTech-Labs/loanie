import { combineReducers } from 'redux';
import tokenIdReducer from './tokenIdReducer';

const rootReducer = combineReducers({
  tokenId: tokenIdReducer,
});

export default rootReducer;
