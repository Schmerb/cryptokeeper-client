import React from 'react';
import { connect } from 'react-redux';

// import ArrowCarrotDown from 'icons/arrow-carrot-down';
import UsersIcon from 'icons/users';

export class ChatUserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    showList() {
        this.setState({
            visible: !this.state.visible
        });
    }

    render() {
        let users = Object.values(this.props.users).filter(user => user !== this.props.name);
        users = users.map((user, index) => 
                <li key={index}>{user}</li>
        );
        return(
            <div className="user-list">
                <label className="user-list-btn" onClick={e => this.showList(e)}>
                    <UsersIcon className={`users-icon ${this.state.visible ? 'open' : ''}`}/>
                </label>
                <div className={`online-users-list ${this.state.visible ? 'show' : ''}`}>
                    <h3>{users.length} {users.length === 1 ? 'person' : 'people'} online:</h3>
                    <ul>
                        {users}
                    </ul>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    users: state.chat.users,
    name: state.chat.name
});

export default connect(mapStateToProps)(ChatUserList);