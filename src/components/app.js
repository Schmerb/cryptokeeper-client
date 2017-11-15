import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { refreshAuthToken } from 'actions/auth';
import { 
    setWidth,
    hasTouch,
    setCurrentPath
 } from 'actions/display';

import { 
    storeURLPath, 
    getURLPath
} from 'utils/local-storage';

import FlashMessage   from './services/flash-message';
import ConfirmMessage from './services/confirmation-message';

import Header from './header/';
import Main   from './main/';
import Footer from './footer/';

window.onload = () => {
    console.log('has loaded!');
}
document.onload = () => {
    console.log('DOCUMENT has loaded!');
}

export class App extends React.Component {
    
    // * * * * * * * * * * * * * * * * * * * *
    // 
    // * * * * * * * * * * * * * * * * * * * *
    componentDidMount() {
        if(this.props.hasAuthToken) {
            // Try to get a fresh auth token if we had an existing one in
            // localStorage
            // console.log('hasAuthToken: ', this.props.hasAuthToken);
            this.props.dispatch(refreshAuthToken());
        }
        this.redirectToPreviousURL();
        this.checkForTouch();
        this.listenForHistoryChange();
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
        const $this = this;
        window.addEventListener('touchstart', function onFirstTouch() {
            // or set your app's state however you normally would
            $this.props.dispatch(hasTouch(true));
            // we only need to know once that a human touched the screen, so we can stop listening now
            window.removeEventListener('touchstart', onFirstTouch, false);
        }, false);
    }

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Redirects to previous route stored in localStorage
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    redirectToPreviousURL() {
        let pathname = getURLPath();
        if(pathname) {
            this.props.history.push({ pathname });
        }
    }

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Listens for history change and saves in localStorage
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    listenForHistoryChange() {
        this.props.history.listen((location, action) => {
            storeURLPath(location.pathname);
            this.props.dispatch(setCurrentPath(location.pathname));
        });
    }

    // * * * * * * * * * * * * * * * * * * * *
    // Dispatches action to update current 
    // window width in state
    // * * * * * * * * * * * * * * * * * * * *
    handleWindowResize($this) {
        // console.log('innder width:', window.innerWidth);
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
        let confirmMsg = null,
            flashMsg   = null;
        if(this.props.flashMsg) {
            flashMsg = <FlashMessage delay={200} msg={this.props.flashMsg}/>;
        } else if(this.props.confirmMsg) {
            confirmMsg = <ConfirmMessage />;
        }
        return(
            <section className="app">
                {confirmMsg}
                {flashMsg}
                <Header />
                <Main />
                <Footer />
            </section>
        );
    }
}

const mapStateToProps = state => ({
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null,
    justLoggedOut: state.auth.justLoggedOut,
    confirmMsg: state.display.confirmMsg,
    flashMsg: state.display.flashMsg
});

export default withRouter(connect(mapStateToProps)(App));
