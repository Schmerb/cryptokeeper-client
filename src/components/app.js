import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { refreshAuthToken } from 'actions/auth';
import { setWidth } from 'actions/display';
import { hasTouch } from 'actions/display';

import Header from './header/';
import Main from './main/';
import Footer from './footer/';

export class App extends React.Component {
    
    // * * * * * * * * * * * * * * * * * * * *
    // 
    // * * * * * * * * * * * * * * * * * * * *
    componentDidMount() {
        if(this.props.hasAuthToken) {
            // Try to get a fresh auth token if we had an existing one in
            // localStorage
            console.log('hasAuthToken: ', this.props.hasAuthToken);
            this.props.dispatch(refreshAuthToken());
        }
        this.checkForTouch();
    };

    // * * * * * * * * * * * * * * * * * * * *
    // 
    // * * * * * * * * * * * * * * * * * * * *
    componentWillReceiveProps(nextProps) {
        if (nextProps.loggedIn && !this.props.loggedIn) {
            // When we are logged in, refresh the auth token periodically
            this.startPeriodicRefresh();
        } else if (!nextProps.loggedIn && this.props.loggedIn) {
            // Stop refreshing when we log out
            this.stopPeriodicRefresh();
        }
    };

    // * * * * * * * * * * * * * * * * * * * *
    // Fires when component is about to mount
    // * * * * * * * * * * * * * * * * * * * *
    componentWillMount() {
        let $this = this;
        this.stopPeriodicRefresh();
        window.addEventListener('resize', () => this.handleWindowResize($this));
    };

    // * * * * * * * * * * * * * * * * * * * *
    // Fires when component is about to Unmount
    // * * * * * * * * * * * * * * * * * * * *
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
    };

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Checks if a user has touched their device and
    // applies class to body and global var indicating whether
    // user has touched / can touch. 
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    checkForTouch() {
        window.USER_IS_TOUCHING = false;
        const $this = this;
        window.addEventListener('touchstart', function onFirstTouch() {
            // we could use a class
            document.body.classList.add('user-is-touching');
          
            // or set some global variable
            window.USER_IS_TOUCHING = true;
          
            // or set your app's state however you normally would
            $this.props.dispatch(hasTouch(true));
          
            // we only need to know once that a human touched the screen, so we can stop listening now
            window.removeEventListener('touchstart', onFirstTouch, false);
          }, false);
    }

    // * * * * * * * * * * * * * * * * * * * *
    // Dispatches action to update current 
    // window width in state
    // * * * * * * * * * * * * * * * * * * * *
    handleWindowResize($this) {
        console.log('innder width:', window.innerWidth);
        this.props.dispatch(setWidth(window.innerWidth));
    }

    // * * * * * * * * * * * * * * * * * * * *
    // starts timer and refreshes JWT token
    // every hour
    // * * * * * * * * * * * * * * * * * * * *
    startPeriodicRefresh() {
        this.refreshInterval = setInterval(
            () => this.props.dispatch(refreshAuthToken()),
            60 * 60 * 1000 // one hour
        );
    };

    // * * * * * * * * * * * * * * * * * * * *
    // stops timer if it is currently running
    // * * * * * * * * * * * * * * * * * * * *
    stopPeriodicRefresh() {
        if(!this.refreshInterval) {
            return;
        }

        clearInterval(this.refreshInterval);
    };

    render () {
        return(
            <section className="app">
                <Header />
                <Main />
                <Footer />
            </section>
        );
    }
}

const mapStateToProps = state => ({
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(App));