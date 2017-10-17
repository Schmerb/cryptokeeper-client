import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect }    from 'react-redux';

import ChatForm     from './chat-form';
import ChatMessages from './chat-messages';
import ChatUserList from './chat-user-list';

import ChatIcon from 'icons/chat-icon';
import BackBtn  from 'icons/back-btn';

export class ChatBox extends Component {

    // * * * * * * * * * * * * * * * 
    // Returns user to homepage
    // * * * * * * * * * * * * * * * 
    goBack() {
        this.props.history.push({
            pathname: '/'
        });
    }

    render() {
        if(!this.props.visited) {
            return <Redirect to={'/chat'}/>
        }
        return(
            <div className={`chat-box ${this.props.hasTouch ? 'mobile' : ''}`}>
                <BackBtn onClick={() => this.goBack()}/>
                <ChatIcon className="chat-icon"/>
                <h2>Live Chat Room</h2>
                <ChatUserList />
                <ChatMessages />
                <div className="user-typing">
                    {this.props.userTyping} { this.props.userTyping ? 'is typing . . .' : ''}
                </div>
                <ChatForm />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    msgs: state.chat.msgs,
    name: state.chat.name,
    users: state.chat.users,
    visited: state.chat.visited,
    userTyping: state.chat.userTyping,
    loggedUserIn: state.chat.loggedUserIn,
    hasTouch: state.display.hasTouch
});

export default withRouter(connect(mapStateToProps)(ChatBox));