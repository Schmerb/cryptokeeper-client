import React from 'react';
import {connect} from 'react-redux';



export class ChatUserList extends React.Component {
    render() {

        let users = Object.values(this.props.users).filter(user => user !== this.props.name);
        users = users.map((user, index) => 
                <li key={index}>{user}</li>
        );

        return(
            <div className="user-list">
                <h3>{users.length} {users.length === 1 ? 'person' : 'people'} online:</h3>
                <ul>
                    {users}
                </ul>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    users: state.chat.users,
    name: state.chat.name
});

export default connect(mapStateToProps)(ChatUserList);