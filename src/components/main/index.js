import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import Landing      from './landing/';
import ChatBoard    from './chat-board/';
import LoginPage    from './login-page/';
import SignupPage   from './signup-page/';
import Dashboard    from './dashboard/';
import Currencies   from './currencies/';

export class Main extends React.Component {
    applyBackgroundImg() {
        if(this.props.location.pathname.includes('dashboard')) {
            // document.body.classList.toggle('dashboard-back', true);
            return 'dashboard-back';
        } else if (this.props.location.pathname === '/') {
            // document.body.classList.toggle('dashboard-back', false);
            return 'landing-back';
        }
        return '';
    }

    render() {
        let classes = this.applyBackgroundImg();
        return(
            <main role="main" className={classes}>
                <div className="container">
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/chat" component={ChatBoard} />
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/signup" component={SignupPage} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route exact path="/currencies" component={Currencies} />
                </div> 
            </main>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(Main));