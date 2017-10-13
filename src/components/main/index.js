import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import Landing    from './landing/';
import ChatBoard  from './chat-board/';
import LoginPage  from './login-page/';
import SignupPage from './signup-page/';
import Dashboard  from './dashboard/';
import Currencies from './currencies/';

export class Main extends React.Component {

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Returns appropriate class with background image for
    // current url
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    applyBackgroundImg() {
        let path = this.props.location.pathname;
        if(path === '/') {
            return 'landing-back';
        } else if (path === '/dashboard/settings' || path === '/dashboard/avatar') {
            return 'settings-back';
        } else if (path === '/login' || path === '/signup') {
            return 'login-signup-back';
        } else if (path === '/chat') {
            return 'live-chat-back';
        } else if (path === '/currencies') {
            return 'currencies-back';
        } else if(path.includes('dashboard')) {
            return 'dashboard-back';
        } 
        return '';
    }

    render() {
        let classes = `${this.applyBackgroundImg()} ${this.props.hasTouch ? 'hasTouch' : ''}`;
        return(
            <main role="main" className={classes}>
                <div className="container">
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/chat" component={ChatBoard} />
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/signup" component={SignupPage} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/currencies" component={Currencies} />
                </div> 
            </main>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    hasTouch: state.display.hasTouch
});

export default withRouter(connect(mapStateToProps)(Main));