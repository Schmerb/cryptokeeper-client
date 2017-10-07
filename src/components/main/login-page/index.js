import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import LoginForm from './login-form';

export class LoginPage extends React.Component {
    
    // * * * * * * * * * * * * * * * * * 
    // Fires when state variable in 
    // props is updated
    // * * * * * * * * * * * * * * * * *
    componentWillReceiveProps(nextProps) {
        // If we are logged in redirect straight to the user's dashboard
        if (nextProps.loggedIn) {
            this.props.history.push({
                pathname: `/dashboard${window.innerWidth >= 800 ? '/portfolio' : ''}`,
                msg: 'logged in'
            });
        }
    }

    render() {
        return(
            <div className="login">
                <h3>Login</h3>
                <LoginForm />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(LoginPage));