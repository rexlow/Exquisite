import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import ApiReducer from './ApiReducer';

export default combineReducers({
  auth: AuthReducer,
  api: ApiReducer
})
