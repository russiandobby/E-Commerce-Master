// Overall reducer based on all of apps reducer
import {combineReducers} from 'redux';

import userReducer from './user/user.reducer';

export default combineReducers({
    user: userReducer
});