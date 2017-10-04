import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

import TopNavLinks from './top-nav-links';

import { setCurrentUser, setAuthToken } from 'actions/auth';
import { toggleMenu } from 'actions/display';
import { clearAuthToken } from 'local-storage';


export class TopNavMenu extends React.Component {

    // * * * * * * * * * * * * * * * * * * * *
    // logs user out by removing jwt token
    // * * * * * * * * * * * * * * * * * * * *
    logOut() {
        this.props.dispatch(setCurrentUser(null));
        this.props.dispatch(setAuthToken(null));
        clearAuthToken();
        this.hideMenu();
    }

    // * * * * * * * * * * * * * * * * * * * *
    // hides menu if it is currently open
    // * * * * * * * * * * * * * * * * * * * *
    hideMenu() {
        if(this.props.open) {
            this.props.dispatch(toggleMenu());
        }
    }

    render() {
        let classes = `${this.props.open ? 'open': ''}`;
        return (   
                <ul className={classes}>
                    <TopNavLinks 
                        open={this.props.open}
                        loggedIn={this.props.loggedIn}
                        username={this.props.username}
                        hideMenu={() => this.hideMenu()}
                        logOut={() => this.logOut()}/>
                </ul>
        );
    };
}

const mapStateToProps = state => {
    const { currentUser } = state.auth;
    return {
        loggedIn: state.auth.currentUser !== null,
        username: currentUser ? state.auth.currentUser.username : '',
        open: state.display.open
    };
};

export default connect(mapStateToProps)(TopNavMenu);