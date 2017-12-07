import { combineReducers } from 'redux';
import LoginReducer from './modules/login.js';
import ParentsReducer from '../redux/modules/parents';
import RequestsReducer from '../redux/modules/requests';

export default combineReducers({
  login: LoginReducer,
  parents: ParentsReducer,
  requests: RequestsReducer,
});
