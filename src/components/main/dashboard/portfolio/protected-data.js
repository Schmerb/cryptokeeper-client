import React from 'react';
import { connect } from 'react-redux';

import { fetchProtectedData } from 'actions/protected-data';

export class ProtectedData extends React.Component {
    componentDidMount() {
        if (!this.props.loggedIn) {
            return;
        }
        this.props.dispatch(fetchProtectedData());
    }

    render() {
        return (
            <div className="protected-data">
                <div className="dashboard-username">
                    Username: {this.props.username}
                </div>
                <div className="dashboard-name">Name: {this.props.name}</div>
                <div className="dashboard-protected-data">
                    Protected data: {this.props.protectedData}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { currentUser } = state.auth;
    return {
        loggedIn: currentUser !== null,
        username: currentUser ? state.auth.currentUser.username : '',
        name: currentUser
            ? `${currentUser.firstName} ${currentUser.lastName}`
            : '',
        protectedData: state.protectedData.data
    };
};


export default connect(mapStateToProps)(ProtectedData);