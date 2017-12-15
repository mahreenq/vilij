import { combineReducers } from 'redux';
import LoginReducer from './modules/login.js';
import ParentsReducer from '../redux/modules/parents';
import RequestsReducer from '../redux/modules/requests';
import NeedsReducer from '../redux/modules/calendar';
import AuthReducer from './modules/auth.js';

export default combineReducers({
  login: LoginReducer,
  auth: AuthReducer,
  parents: ParentsReducer,
  requests: RequestsReducer,
  needs: NeedsReducer
});
