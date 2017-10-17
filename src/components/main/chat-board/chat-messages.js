import React from 'react';
import { connect } from 'react-redux';


export class ChatMessages extends React.Component {
    // * * * * * * * * * * * * * * * * * * * *
    // Fired when a state change occurs
    // * * * * * * * * * * * * * * * * * * * *
    componentDidUpdate() {
        if(this.props.visited) {
            this.updateScroll();
        }
    }  

    // * * * * * * * * * * * * * * * * * * * * 
    // keeps position of chat window at bottom
    // * * * * * * * * * * * * * * * * * * * * 
    updateScroll(){
        let element = document.getElementById("messages");
        element.scrollTop = element.scrollHeight;
    }


    render() {
        const messages = this.props.msgs.map((msg, index) => {
            if(typeof(msg) === 'object') {
                return <li key={index} className={this.props.name === msg.user ? 'my-msg' : 'user-msg'}>
                            <div className="msg">
                                <label className="author">{ msg.user }</label>
                                <span className="msg-content">{ msg.content } </span>
                            </div>
                       </li>
            } 
            return <li key={index}>{ msg }</li>
        });
        return(
            <div id="messages">
                <ul>
                    {messages} 
                </ul>
            </div>
        );
    }
}



const mapStateToProps = state => ({
    msgs: state.chat.msgs,
    visited: state.chat.visited,
    name: state.chat.name
});

export default connect(mapStateToProps)(ChatMessages);