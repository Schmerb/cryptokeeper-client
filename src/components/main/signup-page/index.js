import React        from 'react';
import { connect }  from 'react-redux';
import { withRouter } from 'react-router-dom';

import SignupForm from './signup-form';

export class SignupPage extends React.Component{

    // * * * * * * * * * * * * * * * * * 
    // Fires when state variable in 
    // props is updated
    // * * * * * * * * * * * * * * * * *
    componentWillReceiveProps(nextProps) {
        // If we are logged in redirect straight to the user's dashboard
        if (nextProps.loggedIn) {
            let path = '';
            if(window.innerWidth >= 805 && !this.props.hasTouch) {
                path = '/portfolio';
            }
            this.props.history.push({
                pathname: `/dashboard${path}` // goes right to portfolio on larger screens
            });
        }
    }

    getUserNumber = () => {
        console.log('Inside signup Page');
        this.props.history.push({
            pathanme: '/dashboard/settings'
        });
    }


    render() {
        return(
            <div className="signup">
                <h3>Signup</h3>
                <SignupForm getUserNumber={this.getUserNumber}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    hasTouch: state.display.hasTouch
});

export default withRouter(connect(mapStateToProps)(SignupPage));