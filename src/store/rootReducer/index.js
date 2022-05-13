import {combineReducers} from 'redux';
import {
    getUserInfoReducer,
} from './userReducer';

import {userActionType} from "../actionTypes/userActionType";


const appReducer = combineReducers({
    user: getUserInfoReducer,
});


const rootReducer = (state, action) => {
    if (action.type === userActionType.USER_LOGOUT) {
        state = undefined;
    }
    return appReducer(state, action);
};


export default rootReducer;




