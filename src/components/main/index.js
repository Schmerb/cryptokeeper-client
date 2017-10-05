import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import Landing from './landing/';
import ChatBoard from './chat-board/';
import LoginPage from './login-page/';
import SignupPage from './signup-page/';
import Dashboard from './dashboard/';


export class Main extends React.Component {
    
    render() {
        return(
            <main role="main">
                <div className="container">
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/chat" component={ChatBoard} />
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/signup" component={SignupPage} />
                    <Route exact path="/dashboard" component={Dashboard} />
                </div> 
            </main>
        );
    }
}


const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(Main));