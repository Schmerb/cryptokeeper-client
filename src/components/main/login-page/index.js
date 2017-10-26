import React          from 'react';
import { connect }    from 'react-redux';
import { withRouter } from 'react-router-dom';

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
            let path = '';
            if(window.innerWidth >= 805 && !this.props.hasTouch) {
                path = '/portfolio';
            }
            this.props.history.push({
                pathname: `/dashboard${path}` // goes right to portfolio on larger screens
            });
        }
    }

    imgLoad(e) {
        // console.log('image has loaded!!!!');
        const $this = this;
        setTimeout(function() {
            $this.setState({
                loaded: true
            });
        }, 100);
    }

    render() {
        if(this.state.loaded) {
            return  (
                <div className="login">
                    <h3>Login</h3>
                    <LoginForm />
                </div>
            );
        }
        return(
            <div>
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