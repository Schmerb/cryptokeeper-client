import React from 'react';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export default function SideNav(props) {
    return(
        <div className="side-nav">
            <ul className="account-links">
                <li>
                    <Link to={'/dashboard/portfolio'}>My Portfolio</Link>
                </li>
                <li>
                    <Link to={'/dashboard/events'}>Events</Link>
                </li>
            </ul>

            <hr/>

            <ul className="account-links">
                <h2>My Account</h2>
                <li>
                    <Link to={'/dashboard/avatar'}>Avatar</Link>
                </li>
                <li>
                    <Link to={'/dashboard/settings'}>Settings</Link>
                </li>
            </ul>
        </div>
    );
}