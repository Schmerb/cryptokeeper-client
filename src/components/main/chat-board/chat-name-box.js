import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import ChatIcon from 'icons/chat-icon';

import { setUserName } from 'actions/chat';

export class ChatNameBox extends Component {
    // * * * * * * * * * * * * * * * * * * * *
    // Fires when components mounts to DOM
    // instantiates socket event listeners
    // * * * * * * * * * * * * * * * * * * * *
    componentDidMount() {
        if(!this.props.visited) {
            // focus input on initial mount
            this.nInput.focus();
        }
    }

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // handles nickname form submit
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    handleNameSubmit = (e) => {
        e.preventDefault();
        this.props.dispatch(setUserName(this.nInput.value));
        this.props.history.push({
            pathname: '/chat/room'
        });
    }
    
    render() {
        if(this.props.visited) {
            return <Redirect to={'/chat/room'}/>
        }
        return(
            <div className="name-box">
                <h2>Enter a nickname</h2>
                <ChatIcon className="chat-icon"/>
                <form action="#!" onSubmit={this.handleNameSubmit} autoComplete="off">
                    <input ref={input => this.nInput = input} type="text"/>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    visited: state.chat.visited
});

export default connect(mapStateToProps)(ChatNameBox);