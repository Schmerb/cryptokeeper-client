import React          from 'react';
import { connect }    from 'react-redux';
import { withRouter } from 'react-router-dom';

import { flashMessage } from 'actions/display';

import LoginForm from './login-form';

import Spinner from 'react-spinkit';


export class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        };
    }
    
    // * * * * * * * * * * * * * * * * * 
    // Fires when state variable in 
    // props is updated
    // * * * * * * * * * * * * * * * * *
    componentWillReceiveProps(nextProps) {
        // If we are logged in redirect straight to the user's dashboard
        if (nextProps.loggedIn) {
            this.props.history.push({
                pathname: `/dashboard${window.innerWidth >= 805 ? '/portfolio' : ''}`
            });
            this.props.dispatch(flashMessage('Successfully logged in!'));
        }
    }

    imgLoad(e) {
        console.log('image has loaded!!!!');
        this.setState({
            loaded: true
        });
    }

    render() {
        if(this.state.loaded) {
            return  (
                <div className={`login ${this.state.loaded ? '' : 'not-loaded'}`}>
                    <h3>Login</h3>
                    <LoginForm />
                </div>
            );
        }
        return(
            <div className={` ${this.state.loaded ? '' : 'not-loaded'}`}>
                <img src="/assets/images/binary-script-compressor.jpg" alt="" onLoad={e => this.imgLoad(e)}/>
                <Spinner name="circle" fadeIn="none" />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(LoginPage));