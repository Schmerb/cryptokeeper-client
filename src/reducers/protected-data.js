import {
    FETCH_PROTECTED_DATA_SUCCESS,
    FETCH_PROTECTED_DATA_ERROR,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
    GET_USER_AVATAR_SUCCESS,
    GET_USER_AVATAR_ERROR,
    CLEAR_USER_DATA
} from 'actions/protected-data';

const initialState = {
    data: '',
    phoneNumber: '',
    email: '',
    error: null,
    avatar: ''
};

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_PROTECTED_DATA_SUCCESS:
            return {...state, data: action.data, error: null};
        case FETCH_PROTECTED_DATA_ERROR:
            return {...state, error: action.error};
        case GET_USER_SUCCESS:
            return {
                ...state, 
                email: action.user.email, 
                phoneNumber: action.user.phoneNumber,
                error: null
            };
        case GET_USER_ERROR:
            return {...state, error: action.error};
        case GET_USER_AVATAR_SUCCESS:
            console.log('INSIDE REDUCER', action.avatar);
            return {...state, avatar: action.avatar};
        case GET_USER_AVATAR_ERROR:
            return {...state, error: action.error};
        case UPDATE_USER_SUCCESS:
            return {
                ...state, 
                email: action.email,    
                phoneNumber: action.phoneNumber,
                error: null
            };
        case UPDATE_USER_ERROR:
            return {...state, error: action.error};
        case CLEAR_USER_DATA:
            return initialState;
        default:
            return state;
    }
}
