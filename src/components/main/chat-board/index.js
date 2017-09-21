import React from 'react';
import {connect} from 'react-redux';
// import {Redirect} from 'react-router-dom';

import ChatForm from './chat-form';
import ChatMessages from './chat-messages';
import ChatUserList from './chat-user-list';

import {
    logUserIn,
    addNewMessage,
    updateUsersList,
    setUserName,
    userTyping
} from '../../../actions/chat';

const ioClient = require('socket.io-client')  
const socket   = ioClient('http://localhost:8080');

export class ChatBoard extends React.Component {

    // * * * * * * * * * * * * * * * * * * * *
    // Fires when components mounts to DOM
    // instantiates socket event listeners
    // * * * * * * * * * * * * * * * * * * * *
    componentDidMount() {
        // adds event listeners to component
        this.socketEventListeners();

        if(!this.props.visited) {
            // focus input on initial mount
            this.nInput.focus();
        }
    }

    // * * * * * * * * * * * * * * * * * * * *
    // Fired when a state change occurs
    // * * * * * * * * * * * * * * * * * * * *
    componentDidUpdate() {
        if(this.props.name !== '' && !this.props.loggedUserIn) {
            // let all clients know this user is logged in
            socket.emit('loggedin', this.props.name);
            this.props.dispatch(logUserIn());
        }
    }

    // * * * * * * * * * * * * * * * * * * * *
    // Socket.IO Event listeners
    // * * * * * * * * * * * * * * * * * * * *
    socketEventListeners() {
        socket.on('chat message', msg => {
            this.props.dispatch(addNewMessage(msg));
        });

        socket.on('user typing', user => {
            this.props.dispatch(userTyping(user));
        });

        socket.on('user status', msg => {
            this.props.dispatch(addNewMessage(msg));
        });

        socket.on('loggedin', users => {
            this.props.dispatch(updateUsersList(users));
        })
    }

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // handles nickname form submit
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    handleNameSubmit(e) {
        e.preventDefault();
        this.props.dispatch(setUserName(this.nInput.value));
    }

    render() {
        if(!this.props.visited) {
            return(
                <div className="chat-box name-box">
                    <h2>Enter a nickname</h2>
                    <img src="assets/icons/message-grey.png" alt=""/> 
                    <form action="#!" onSubmit={e => this.handleNameSubmit(e)}>
                        <input ref={input => this.nInput = input} type="text"/>
                    </form>
                </div>
            );
        } else {
            return(
                <div className="chat-box">
                    <img src="assets/icons/message-grey.png" alt=""/>
                    <h2>Live Chat Room</h2>

                    <ChatMessages />

                    <div className="user-typing">
                        {this.props.userTyping} { this.props.userTyping ? 'is typing . . .' : ''}
                    </div>

                    <ChatUserList />
                    <ChatForm socket={socket}/>
                </div>
            );
        }
    }
}

// <input type="text" placeholder="Nickname"/>

const mapStateToProps = state => ({
    msgs: state.chat.msgs,
    name: state.chat.name,
    users: state.chat.users,
    visited: state.chat.visited,
    userTyping: state.chat.userTyping,
    loggedUserIn: state.chat.loggedUserIn
});

export default connect(mapStateToProps)(ChatBoard);