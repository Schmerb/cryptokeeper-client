import React from 'react';
import { connect } from 'react-redux';

import {
    addNewMessage
} from 'actions/chat';

import { socketIO } from 'services/chat-stream';

export class ChatForm extends React.Component {

    // * * * * * * * * * * * * * * * * * * * *
    // Fires when components mounts to DOM
    // instantiates socket event listeners
    // * * * * * * * * * * * * * * * * * * * *
    componentDidMount() {
        this.input.focus();
    }

    // * * * * * * * * * * * * * * * * * * * *
    // Fired when a state change occurs
    // * * * * * * * * * * * * * * * * * * * *
    componentDidUpdate() {
        if(this.props.visited) {
            this.input.focus();
        }
    }   

   
    // * * * * * * * * * * * * * * * * * * * *
    // Handles form submit, emits socket.io 
    // chat message event to server 
    // * * * * * * * * * * * * * * * * * * * * 
    handleSubmit = (e) => {
        e.preventDefault()
        let msg = {
            content: this.input.value,
            user: this.props.name
        };
        socketIO.emit('chat message', msg);
        socketIO.emit('user typing', null);
        this.props.dispatch(addNewMessage(msg));
        this.input.value = '';
        if(this.props.hasTouch) {
            this.input.blur();
        }
    }

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // handles user is typing message 
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    userTyping = (e) => {
        e.preventDefault();
        // console.log(`${this.props.name} is typing . . .`);
        if(this.input.value === '') {
            socketIO.emit('user typing', null);
        } else {
            socketIO.emit('user typing', this.props.name);
        }
    }

    render() {
        return(
            <form className="chat-form" onSubmit={this.handleSubmit} action="#!" autoComplete="off">
                <input ref={input => this.input = input} 
                        id="m" type="text" placeholder="Type something . . ."
                        onChange={this.userTyping}
                        onFocus={this.userTyping}
                        onBlur={() => socketIO.emit('user typing', null)}/>
            </form>
        );
    }
}


const mapStateToProps = state => ({
    name: state.chat.name,
    visited: state.chat.visited,
    hasTouch: state.display.hasTouch
});

export default connect(mapStateToProps)(ChatForm);