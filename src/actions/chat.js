export const LOG_USER_IN = 'LOG_USER_IN';
export const logUserIn = () => ({
    type: LOG_USER_IN
});

export const ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE';
export const addNewMessage = msg => ({
    type: ADD_NEW_MESSAGE,
    msg
});

export const UPDATE_USERS_LIST = 'UPDATE_USERS_LIST';
export const updateUsersList = users => ({
    type: UPDATE_USERS_LIST,
    users
});

export const SET_USER_NAME = 'SET_USER_NAME';
export const setUserName = name => ({
    type: SET_USER_NAME,
    name
});

export const USER_TYPING = 'USER_TYPING';
export const userTyping = user => ({
    type: USER_TYPING,
    userTyping: user
});