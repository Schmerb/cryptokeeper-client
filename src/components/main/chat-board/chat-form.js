import React from 'react';
import {connect} from 'react-redux';

import {
    addNewMessage
} from 'actions/chat';

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
    handleSubmit(e) {
        e.preventDefault()
        let msg = {
            content: this.input.value,
            user: this.props.name
        };
        this.props.socket.emit('chat message', msg);
        this.props.socket.emit('user typing', null);
        this.props.dispatch(addNewMessage(msg));
        this.input.value = '';
    }

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // handles user is typing message 
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    userTyping(e) {
        e.preventDefault();
        // console.log(`${this.props.name} is typing . . .`);
        if(this.input.value === '') {
            this.props.socket.emit('user typing', null);
        } else {
            this.props.socket.emit('user typing', this.props.name);
        }
    }

    render() {
        return(
            <form onSubmit={e => this.handleSubmit(e)} action="#!">
                <fieldset>
                    
                    <input ref={input => this.input = input} 
                            id="m" type="text" placeholder="type a message . . ."
                            onChange={e => this.userTyping(e)}
                            onFocus={e => this.userTyping(e)}
                            onBlur={() => this.props.socket.emit('user typing', null)}/>
                </fieldset>
            </form>
        );
    }
}


const mapStateToProps = state => ({
    name: state.chat.name,
    visited: state.chat.visited
});

export default connect(mapStateToProps)(ChatForm);