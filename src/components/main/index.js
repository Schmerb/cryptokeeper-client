import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

// import Spinner from 'react-spinkit';
import Particles from 'react-particles-js';

import { settings } from 'utils/particles';

import Landing    from './landing/';
import ChatBoard  from './chat-board/';
import LoginPage  from './login-page/';
import SignupPage from './signup-page/';
import Dashboard  from './dashboard/';
import Currencies from './currencies/';

// const spinner = <Spinner name="circle" fadeIn="none" />;

export class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            style: {}
        };
    }

    componentDidMount() {
        this.fixBackgroundImageSize();
    }

    shouldComponentUpdate(nextProps) {
        return ! (!nextProps.hasTouch 
            && this.props.loggedIn === nextProps.loggedIn
            && (this.props.height !== nextProps.height || this.props.width !== nextProps.width)); 
    }

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Fires when componenet receives new props, checks if
    // width/height changed to update background image size
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.width !== this.props.width 
            || prevProps.height !== this.props.height) {
            this.fixBackgroundImageSize();
        } 
    }

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Fixes touch devices background-image max-height to 
    // current height to avoid image jumps when URL bar 
    // appears/hides
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    fixBackgroundImageSize() {
        const height = window.innerHeight;
        const style = {
            maxHeight: height
        };
        this.setState({
            style: this.props.hasTouch ? style : {}
        });
    }

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Returns appropriate class with background image for
    // current url
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    applyBackgroundImg() {
        let path = this.props.location.pathname;
        if(path === '/' || path === '/currencies') {
            // return 'landing-back';
            return 'currency-page-back';
        } else if (path === '/dashboard/settings' || path === '/dashboard/avatar') {
            return 'settings-back';
        } else if (path === '/login' || path === '/signup') {
            return 'login-signup-back';
        } else if (path.includes('chat')) {
            return 'live-chat-back';
        } else if(path.includes('currencies')) {
            return 'currencies-back';
        } else if(path.includes('dashboard')) {
            return 'dashboard-back';
        } 
        return '';
    }



    render() {
        let classes = `${this.applyBackgroundImg()} ${this.props.hasTouch ? 'hasTouch' : ''}`;
        let path = this.props.location.pathname;
        let props = {
            className: 'canvas-wrap',
            canvasClassName: 'canvas',
            params: settings
        };
        let particles = path === '/' ? <Particles {...props}/> : null;
        return(
            <main role="main" >
                <div className={classes} style={this.state.style}></div>
                {/* {particles} */}
                <div ref="container" className={`container`}>
                    <Route exact path="/" component={Landing} />
                    <Route path="/chat" component={ChatBoard} />
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
    hasTouch: state.display.hasTouch,
    width: state.display.width,
    height: state.display.height
});

export default withRouter(connect(mapStateToProps)(Main));