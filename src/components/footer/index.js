import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { toggleMenu } from 'actions/display';

import { logUserOut } from 'services/user';


export class Footer extends React.Component {
    // * * * * * * * * * * * * * * * * * * * *
    // logs user out by removing jwt token
    // * * * * * * * * * * * * * * * * * * * *
    logOut() {
        logUserOut();
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
        let links = (<ul>
                        <li>
                            <Link to={'/'}>Home</Link>
                        </li>
                        <li>
                            <Link to={'/login'}>Login</Link>
                        </li>
                        <li>
                            <Link to={'/signup'}>Signup</Link>
                        </li>
                    </ul>);
        if(this.props.loggedIn) {
            links = (<ul>
                        <li>
                            <Link to={'/'}>Home</Link>
                        </li>
                        <li>
                            <Link to={'/dashboard/portfolio'}>Dashboard</Link>
                        </li>
                        <li>
                            <button className="logout-btn" onClick={() => this.logOut()}>Logout</button>
                        </li>
                    </ul>);
        }
        const classes = this.props.location.pathname.includes('dashboard') ? 'dash': null;
        return(
            <footer role="contentinfo" className={classes}>
                <nav className="f-nav">
                    {links}
                </nav>
                <ul className="social-links">
                    <li>
                        <a href="https://github.com/Schmerb" target="__blank">
                            <i className="fa fa-github" aria-hidden="true">github</i>
                        </a>
                    </li>
                    <li>
                        <a className="fb-link" href="https://www.facebook.com/mike.schmerbeck" target="__blank">
                            <i className="fa fa-facebook" aria-hidden="true"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/michael-schmerbeck-20a8a7126/" target="__blank">
                            <i className="fa fa-linkedin" aria-hidden="true"></i>
                        </a>
                    </li>
                </ul>
                <div className="copy">
                    <span>copyright &copy; 2017 Mike Schmerbeck</span>
                </div>
            </footer>
        );
    }
}


const mapStateToPRops = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToPRops)(Footer));