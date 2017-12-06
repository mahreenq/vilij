import { combineReducers } from 'redux';

import ParentsReducer from '../redux/modules/parents';



export default combineReducers({
    parents: ParentsReducer,

});