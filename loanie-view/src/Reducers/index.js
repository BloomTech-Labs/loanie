import { combineReducers } from 'redux';
import tokenIdReducer from './tokenIdReducer';
import { loansReducer } from './loansReducer'

const rootReducer = combineReducers({
  tokenId: tokenIdReducer,
  loans: loansReducer,
});

export default rootReducer;
