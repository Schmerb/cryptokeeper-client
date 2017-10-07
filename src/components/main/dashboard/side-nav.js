import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { setCurrentUser, setAuthToken } from 'actions/auth';
import { clearAuthToken } from 'local-storage';

import PortfolioBag from 'icons/portfolio-bag';
import EventGraph from 'icons/event-graph';

export class SideNav extends React.Component {
    render() {
        let path = this.props.location.pathname;
        return(
            <div className="side-nav">
                <ul className="dash-links">
                    <li className={path.includes('portfolio') ? 'current' : ''}>
                        
                        <Link to={'/dashboard/portfolio'}>
                            <PortfolioBag />
                            <span>My Portfolio</span>
                        </Link>
                    </li>
                    <li className={path.includes('events') ? 'current' : ''}>
                        <Link to={'/dashboard/events'}>
                            <EventGraph />
                            <span>Events</span>
                        </Link>
                    </li>
                </ul>

                <hr className="dash-hr"/>

                <ul className="account-links">
                    <h2>My Account</h2>
                    <li className={path.includes('avatar') ? 'current' : ''}>
                        <Link to={'/dashboard/avatar'}>Avatar</Link>
                    </li>
                    <li className={path.includes('settings') ? 'current' : ''}>
                        <Link to={'/dashboard/settings'}>Settings</Link>
                    </li>
                    <li className="logout-li">
                        <button onClick={e => this.props.logOut()}>Logout</button>
                    </li>
                </ul>
            </div>
        );
   }
}

const mapDispatchToProps = dispatch => ({
    logOut: () => {
        dispatch(setCurrentUser(null));
        dispatch(setAuthToken(null));
        clearAuthToken();
    }
});

export default withRouter(connect(null, mapDispatchToProps)(SideNav));