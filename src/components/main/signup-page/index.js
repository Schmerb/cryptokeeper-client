import React        from 'react';
import { connect }  from 'react-redux';
import { withRouter } from 'react-router-dom';

import { flashMessage } from 'actions/display';

import SignupForm from './signup-form';

export class SignupPage extends React.Component{

    // * * * * * * * * * * * * * * * * * 
    // Fires when state variable in 
    // props is updated
    // * * * * * * * * * * * * * * * * *
    componentWillReceiveProps(nextProps) {
        // If we are logged in redirect straight to the user's dashboard
        if (nextProps.loggedIn) {
            this.props.history.push({
                pathname: `/dashboard${window.innerWidth >= 800 ? '/portfolio' : ''}`
            });
        }
        this.props.dispatch(flashMessage('Successfully registered!'));
    }

    render() {
        return(
            <div className="signup">
                <h3>Signup</h3>
                <SignupForm />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(SignupPage));