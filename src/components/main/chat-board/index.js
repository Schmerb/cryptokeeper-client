import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import { logUserIn } from 'actions/chat';

import ChatNameBox from './chat-name-box';
import ChatBox     from './chat-box';


import { socketIO } from 'services/chat-stream';

export class ChatBoard extends React.Component {

    // * * * * * * * * * * * * * * * * * * * *
    // Fires when components mounts to DOM
    // instantiates socket event listeners
    // * * * * * * * * * * * * * * * * * * * *
    componentDidMount() {
    }

    // * * * * * * * * * * * * * * * * * * * *
    // Fired when a state change occurs
    // * * * * * * * * * * * * * * * * * * * *
    componentDidUpdate() {
        if(this.props.name !== '' && !this.props.loggedUserIn) {
            // let all clients know this user is logged in
            socketIO.emit('loggedin', this.props.name);
            this.props.dispatch(logUserIn());
        }
    }

    componentWillReceiveProps(nextProps) {
        // if(!this.props.visited && nextProps.visited) {
        //     this.props.history.push({
        //         pathname: '/chat/room'
        //     });
        // }
    }


    render() {
        return(
            <div>
                <Route exact path="/chat" component={ChatNameBox}/>
                <Route exact path="/chat/room" component={ChatBox}/>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    name: state.chat.name,
    visited: state.chat.visited,
    loggedUserIn: state.chat.loggedUserIn
});

export default connect(mapStateToProps)(ChatBoard);