import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter, Route } from 'react-router-dom';

import Portfolio from './portfolio/';
import ProtectedData from './protected-data';
import SideNav from './side-nav';

export class Dashboard extends React.Component {

    render() {
        // Only visible to logged in users
        if (!this.props.loggedIn) {
            return <Redirect to="/" />;
        }

        console.log('This is the location: ', this.props.location);

        return (
            <div className="dashboard">
                <SideNav />
                <Route exact path="/dashboard/portfolio" component={Portfolio}/>
                {/* <ProtectedData /> */}
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


export default withRouter(connect(mapStateToProps)(Dashboard));