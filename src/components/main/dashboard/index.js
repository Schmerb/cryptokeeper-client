import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import MobileDashboard from './mobile-dashboard/';
import MobileNav       from './mobile-dashboard/mobile-nav';
import SideNav         from './side-nav';
import Portfolio       from './portfolio/';
import EventsPage      from './events/';
import Avatar          from './account/avatar';
import Settings        from './account/settings';
import VerifyCode      from './account/verify-code';

export class Dashboard extends React.Component {

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Checks path and returns appropriate components or null
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    checkPath() {
        let path = this.props.location.pathname;
        let nav  = null;
        let mobileDash = null;
        if(this.props.width >= 805) {
            nav = (<SideNav />);
        } else {
            if(path === '/dashboard') {
                mobileDash = <MobileDashboard />;
            } 
            if (path.includes('dashboard/')) {
                nav = <MobileNav path={path}/>;
            }
        }
        return { nav, mobileDash };
    }

    render() {
        const { pathname } = this.props.location;
        // Only visible to logged in users
        if (!this.props.loggedIn) {
            return <Redirect to="/" />; // Fires when logOut() is dispatched
        } 
        else if(this.props.width >= 805 && (pathname === '/dashboard' || pathname === '/dashboard/')) {
            return <Redirect to="/dashboard/portfolio"/>
        }
        const { nav, mobileDash } = this.checkPath();
        return (
            <div className="dashboard">
                {nav}
                {mobileDash}
                <Route path="/dashboard/portfolio" component={Portfolio} />
                <Route path="/dashboard/events" component={EventsPage} />
                <Route exact path="/dashboard/avatar" component={Avatar}/>
                <Route exact path="/dashboard/settings" component={Settings}/>
                <Route exact path="/dashboard/settings/verify-code" component={VerifyCode}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { currentUser } = state.auth;
    const { width }       = state.display;
    return {
        currentUser,
        loggedIn: currentUser !== null,
        username: currentUser ? currentUser.username : '',
        name: currentUser
            ? `${currentUser.firstName} ${currentUser.lastName}`
            : '',
        protectedData: state.protectedData.data,
        width
    };
};


export default connect(mapStateToProps)(Dashboard);