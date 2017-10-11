import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
                            <Link to={'/dashboard'}>Dashboard</Link>
                        </li>
                        <li>
                            <button className="logout-btn" onClick={() => this.logOut()}>Logout</button>
                        </li>
                    </ul>);
        }

        return(
            <footer role="contentinfo">
                <nav className="f-nav">
                    {links}
                </nav>
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

export default connect(mapStateToPRops)(Footer);