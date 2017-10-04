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
    if(action.type === LOG_USER_IN) {
        return Object.assign({}, state, {
            loggedUserIn: true
        });
    } else if(action.type === ADD_NEW_MESSAGE) {
        return Object.assign({}, state, {
            msgs: [...state.msgs, action.msg]
        });
    } else if(action.type === UPDATE_USERS_LIST) {
        return Object.assign({}, state, {
            users: action.users
        });
    } else if(action.type === SET_USER_NAME) {
        return Object.assign({}, state, {
            name: action.name,
            visited: true
        });
    } else if(action.type === USER_TYPING) {
        return Object.assign({}, state, {
            userTyping: action.userTyping
        });
    }
    return state;
}