import { combineReducers } from 'redux';
import LoginReducer from './modules/login.js';
import ParentsReducer from '../redux/modules/parents';

export default combineReducers({
  login: LoginReducer,
  parents: ParentsReducer
});
