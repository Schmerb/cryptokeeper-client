import { 
    LOG_USER_IN,
    LOG_USER_OUT,
    ADD_NEW_MESSAGE,
    CLEAR_MESSAGES,
    UPDATE_USERS_LIST,
    SET_USER_NAME,
    USER_TYPING
 } from 'actions/chat'

const initialState = {
    msgs: [],
    name: '',
    userTyping: null,
    users: [],
    visited: false,
    loggedUserIn: false
};


export default function reducer(state = initialState, action) {
    switch(action.type) {
        case LOG_USER_IN:
            return {...state, loggedUserIn: true}
        case LOG_USER_OUT:
            return {
                ...state, 
                msgs: [],
                visited: false,
                loggedUserIn: false
            }
        case ADD_NEW_MESSAGE:
            return {...state, msgs: [...state.msgs, action.msg]}
        case CLEAR_MESSAGES:
            return {
                ...state,
                msgs: [],
                visited: false
            };
        case UPDATE_USERS_LIST:
            return {...state, users: action.users};
        case SET_USER_NAME:
            return {
                ...state,
                name: action.name,
                visited: true
            };
        case USER_TYPING:
            return {...state, userTyping: action.userTyping};
        default:
            return state;
    }
}