import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter, Route } from 'react-router-dom';

import MobileDashboard from './mobile-dashboard/';
import MobileNav from './mobile-dashboard/mobile-nav';
import Portfolio from './portfolio/';
import Events from './events/';
import Avatar from './account/avatar';
import Settings from './account/settings';
import SideNav from './side-nav';

export class Dashboard extends React.Component {

    render() {
        // Only visible to logged in users
        if (!this.props.loggedIn) {
            return <Redirect to="/" />; // Fires when logOut() is dispatched
        }
        let path = this.props.location.pathname;
        let nav  = null;
        let mobileDash = null;
        if(this.props.width >= 736) {
            nav = (<SideNav />);
        } else {
            if(path === '/dashboard') {
                mobileDash = <MobileDashboard />;
            } 
            if (path.includes('dashboard/')) {
                nav = <MobileNav path={path}/>;
            }
        }
        

        console.log('This is the location: ', this.props.location);

        return (
            <div className="dashboard">
                {nav}
                {mobileDash}
                <Route exact path="/dashboard/portfolio" component={Portfolio}/>
                <Route exact path="/dashboard/events" component={Events}/>
                <Route exact path="/dashboard/avatar" component={Avatar}/>
                <Route exact path="/dashboard/settings" component={Settings}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { currentUser } = state.auth;
    const { width }       = state.display;
    return {
        loggedIn: currentUser !== null,
        username: currentUser ? state.auth.currentUser.username : '',
        name: currentUser
            ? `${currentUser.firstName} ${currentUser.lastName}`
            : '',
        protectedData: state.protectedData.data,
        width
    };
};


export default withRouter(connect(mapStateToProps)(Dashboard));