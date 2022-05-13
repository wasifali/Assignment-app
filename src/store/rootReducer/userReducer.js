import { userActionType } from "../actionTypes/userActionType";

const initialState = {
    data: '',
    loading: false,
    error: ''
};

export const userAddInfoReducer = (state = initialState, action) => {
    switch (action.type) {

        case userActionType.ADD_USER_INFO_LOADING: {
            return {
                ...state,
                loading: true
            }
        }

        case userActionType.ADD_USER_INFO_SUCCESS: {
            return {
                ...state,
                data: action.payload,
                loading: false
            }
        }

        case userActionType.ADD_USER_INFO_FAILURE: {
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        }
        default: {
            return state;
        }
    }
};



export const getUserInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case userActionType.GET_USER_INFO_LOADING: {
            return {
                ...state,
                loading: true
            }
        }

        case userActionType.GET_USER_INFO_SUCCESS: {
            return {
                ...state,
                data: action.payload,
                loading: false
            }
        }

        case userActionType.GET_USER_INFO_FAILURE: {
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        }
        default: {
            return state;
        }
    }
};