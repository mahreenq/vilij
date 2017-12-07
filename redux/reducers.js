import { combineReducers } from 'redux';
import LoginReducer from './modules/login.js';
import ParentsReducer from '../redux/modules/parents';
import RequestsReducer from '../redux/modules/requests';
import NeedsReducer from '../redux/modules/calendar';

export default combineReducers({
  login: LoginReducer,
  parents: ParentsReducer,
  requests: RequestsReducer,
  needs: NeedsReducer
});
