import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import { WindowResizeListener } from 'react-window-resize-listener';
import {setCurrentUser, setAuthToken} from '../../actions/auth';
import {toggleMenu} from '../../actions/display';
import {clearAuthToken} from '../../local-storage';

import Burger from './burger';
import Dim from '../dim';

export class TopNav extends React.Component {
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
    // Checks window on resize and hides 
    // sidemenu if currently opened
    // * * * * * * * * * * * * * * * * * * * *
    resize(windowSize) {
        let width  = windowSize.windowWidth;
        if(width >= 500 && this.props.open) {
                this.props.dispatch(toggleMenu());
        }
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
        let links   = (<ul>
                          <li>
                              <Link to={'/login'} onClick={e => this.hideMenu()}>Login</Link>
                          </li>
                          <li>
                              <Link to={'/signup'} onClick={e => this.hideMenu()}>Signup</Link>
                          </li>
                      </ul>);
        let user = null;
        if(this.props.loggedIn) {
            user  = (<li className="welcome-msg"> 
                        <Link className="avatar-link" to="/dashboard">
                            <img src="/assets/icons/tie-avatar.svg" className="tie-avatar" alt="default profile avatar icon with tie"/> 
                            {this.props.username}
                        </Link>
                    </li>);
            links = (<ul>
                        {!this.props.open ? user : null}
                        <li><button className="logout-btn" onClick={() => this.logOut()}>Logout</button></li>
                    </ul>);
        }

        return(
                <nav className="m-nav">
                    <WindowResizeListener onResize={windowSize => this.resize(windowSize)}/>
                    <Burger />
                    <Dim />
                    <ul className={classes}>
                        <li>
                            <ul>
                                {this.props.open ? user: null}
                                <li>
                                    <Link to={'/'} onClick={e => this.hideMenu()}>Home</Link>
                                </li>
                                <li>
                                    <Link to={'/chat'} onClick={e => this.hideMenu()}>LiveChat</Link>
                                </li>
                            </ul>
                        </li>
                        <li className="user-links">
                            {links}
                        </li>
                    </ul>
                </nav>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        loggedIn: state.auth.currentUser !== null,
        username: currentUser ? state.auth.currentUser.username : '',
        open: state.display.open
    };
};

export default connect(mapStateToProps)(TopNav);