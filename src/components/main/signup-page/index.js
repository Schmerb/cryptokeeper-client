import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import SignupForm from './signup-form';

export function SignupPage(props){
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard/portfolio" />;
    }

    return(
        <div className="signup">
            <h3>Signup</h3>
            <SignupForm />
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(SignupPage);