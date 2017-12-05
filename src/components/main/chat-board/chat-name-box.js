import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Spinner from 'react-spinkit';

import { setUserName, logUserIn } from 'actions/chat';
import { socketIO } from 'services/chat-stream';

import ChatIcon from 'icons/chat-icon';


export class ChatNameBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        };
    }

    // * * * * * * * * * * * * * * * * * * * *
    // Fires when components mounts to DOM
    // instantiates socket event listeners
    // * * * * * * * * * * * * * * * * * * * *
    componentDidMount() {
        if(!this.props.visited && this.state.loaded) {
            // focus input on initial mount
            this.refs.input.focus(); 
        }
    }

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // handles nickname form submit
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    handleNameSubmit = (e) => {
        e.preventDefault();
        const username = this.nInput.value;
        this.props.dispatch(setUserName(username));
        this.props.history.push({
            pathname: '/chat/room'
        });
        socketIO.emit('loggedin', username);
        this.props.dispatch(logUserIn());
    }

    // * * * * * * * * * * * * * * * * * 
    // Lets state know when background 
    // image is loaded
    // * * * * * * * * * * * * * * * * *
    imgLoad = e => {
        this.setState({
            loaded: true
        });
    }
    
    render() {
        if(this.props.visited) {
            return <Redirect to={'/chat/room'}/>
        }
        else if(this.state.loaded) {
            return(
                <div className="name-box">
                    <h2>Enter a nickname</h2>
                    <ChatIcon className="chat-icon"/>
                    <form action="#!" onSubmit={this.handleNameSubmit} autoComplete="off">
                        <input ref="input" type="text"/>
                    </form>
                </div>
            );
        }
        return(
            <div className="loading-container">
                <img src="/assets/images/times-square-prog-kraken.jpg" alt="" onLoad={this.imgLoad}/>
                <Spinner className="spinner" name="circle" fadeIn="none" color="coral" />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    visited: state.chat.visited
});

export default connect(mapStateToProps)(ChatNameBox);