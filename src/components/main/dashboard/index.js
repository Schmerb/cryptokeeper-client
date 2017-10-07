import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter, Route } from 'react-router-dom';

import MobileDashboard from './mobile-dashboard/';
import MobileNav       from './mobile-dashboard/mobile-nav';
import Portfolio       from './portfolio/';
import Events          from './events/';
import Avatar          from './account/avatar';
import Settings        from './account/settings';
import SideNav         from './side-nav';
import FlashMessage    from './flash-message';

export class Dashboard extends React.Component {

    componentDidMount() {
        console.log('Component just mounted');
        console.log(this.props);
    }

    componentWillReceiveProps(nextProps) {
        console.log("current:", this.props);
        console.log("next:", nextProps);
    }

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Checks path and returns appropriate components or null
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    checkPath() {
        let path = this.props.location.pathname;
        let nav  = null;
        let mobileDash = null;
        if(this.props.width >= 800) {
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

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Returns flash message if passed as prop, null otherwise
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    checkForFlashMsg() {
        let msg   = this.props.location.msg;
        let flash = null;
        if(msg) {
            flash = <FlashMessage msg={msg}/>;
        }
        return { flash };
    }


    render() {
        console.log('This is the location: ', this.props.location);
        // Only visible to logged in users
        if (!this.props.loggedIn) {
            return <Redirect to="/" />; // Fires when logOut() is dispatched
        }
        const { nav, mobileDash } = this.checkPath();
        const { flash } = this.checkForFlashMsg();
        return (
            <div className="dashboard">
                {nav}
                {mobileDash}
                {flash}
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