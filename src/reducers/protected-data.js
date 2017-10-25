import {
    FETCH_PROTECTED_DATA_SUCCESS,
    FETCH_PROTECTED_DATA_ERROR,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    GET_USER_SUCCESS,
    GET_USER_ERROR
} from 'actions/protected-data';

const initialState = {
    data: '',
    phoneNumber: '',
    email: '',
    error: null
};

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_PROTECTED_DATA_SUCCESS:
            return {...state, data: action.data, error: null};
        case FETCH_PROTECTED_DATA_ERROR:
            return {...state, error: action.error};
        case GET_USER_SUCCESS:
        console.log('reducer GET USER');
            return {
                ...state, 
                email: action.user.email, 
                phoneNumber: action.user.phoneNumber,
                error: null
            };
        case GET_USER_ERROR:
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
        default:
            return state;
    }
}
