import { 
    LOG_USER_IN,
    ADD_NEW_MESSAGE,
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
            return Object.assign({}, state, {
                loggedUserIn: true
            });
        case ADD_NEW_MESSAGE:
            return Object.assign({}, state, {
                msgs: [...state.msgs, action.msg]
            });
        case UPDATE_USERS_LIST:
            return Object.assign({}, state, {
                users: action.users
            });
        case SET_USER_NAME:
            return Object.assign({}, state, {
                name: action.name,
                visited: true
            });
        case USER_TYPING:
            return Object.assign({}, state, {
                userTyping: action.userTyping
            });
        default:
            return state;
    }
}