import { HEROKU_BASE_URL } from 'config';

import {
    addNewMessage,
    updateUsersList,
    userTyping
} from 'actions/chat';

const socket = require('socket.io-client')(HEROKU_BASE_URL);

let store = null;

export default function(storeObj) {
    store = storeObj;

    socket.on('chat message', 
                msg => store.dispatch(addNewMessage(msg)));

    socket.on('user typing', 
                user => store.dispatch(userTyping(user)));

    socket.on('user status', 
                msg => store.dispatch(addNewMessage(msg)));

    socket.on('updated users', 
                users => store.dispatch(updateUsersList(users)));
}

export const socketIO = socket;

