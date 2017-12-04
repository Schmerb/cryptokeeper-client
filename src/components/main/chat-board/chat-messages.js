import React from 'react';
import { connect } from 'react-redux';


export class ChatMessages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lockScreen: true
        };
    }


    componentDidMount() {
        let element = document.getElementById("messages");
        element.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        let element = document.getElementById("messages");
        element.removeEventListener('scroll', this.handleScroll);
    }



    // * * * * * * * * * * * * * * * * * * * *
    // Fired when a state change occurs
    // * * * * * * * * * * * * * * * * * * * *
    componentDidUpdate() {
        const { visited } = this.props;
        if(visited) {
            this.updateScroll();
        }
    }  

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // 
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    handleScroll = (e) => {
        let el = e.target;
        let distFromBottom = el.scrollHeight - el.scrollTop - el.offsetHeight;
        if(distFromBottom < 0) {
            this.setState({
                lockScreen: true
            });
        } else if(this.state.lockScreen) {
            this.setState({
                lockScreen: false
            });
        }
    }

    // * * * * * * * * * * * * * * * * * * * * 
    // keeps position of chat window at bottom
    // * * * * * * * * * * * * * * * * * * * * 
    updateScroll(){
        let element = document.getElementById("messages");
        const { scrollHeight } = element;
        const { name, msgs } = this.props;
        if(this.state.lockScreen || name === msgs[msgs.length - 1].user) {
            element.scrollTop = scrollHeight;
        }
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