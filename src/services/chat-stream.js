import {
    addNewMessage,
    updateUsersList,
    userTyping
} from 'actions/chat';

const ioClient = require('socket.io-client')  
// const socket   = ioClient('http://localhost:8080');
// const socket   = ioClient('http://192.168.1.112:8080');
const socket   = ioClient('https://cryptocoinkeeper.herokuapp.com/');

let store = null;

export default function(storeObj) {
    store = storeObj;

    socket.on('chat message', msg => {
        store.dispatch(addNewMessage(msg));
    });

    socket.on('user typing', user => {
        store.dispatch(userTyping(user));
    });

    socket.on('user status', msg => {
        store.dispatch(addNewMessage(msg));
    });

    socket.on('loggedin', users => {
        store.dispatch(updateUsersList(users));
    })
}

export const socketIO = socket;

