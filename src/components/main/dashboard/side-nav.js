import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { dashHoverVr, confirmMessage } from 'actions/display';

import { logUserOut } from 'services/user';

import PortfolioBag from 'icons/portfolio-bag';
import EventGraph   from 'icons/event-graph';
import LogoutIcon   from 'icons/logout-icon';

export class SideNav extends React.Component {

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Dispatches action to move vertical positioning bar
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    hover(target) {
        // update the class on dash-vr
        // console.log('target: ', target);
        this.props.dispatch(dashHoverVr(target));
    }

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Dispatches action to display confirm modal
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    confirmLogOut() {
        this.props.dispatch(confirmMessage('Are you sure you want to log out?', logUserOut, 'LogOut'));
    }

    render() {
        let path = this.props.location.pathname;
        return(
            <div className="side-nav">
                <hr className={`dash-vr ${this.props.item}`}/>

                <ul className="dash-links">
                    <li className={`one ${path.includes('portfolio') ? 'current' : ''}`} 
                        onMouseEnter={() => this.hover('one')}
                        onMouseLeave={() => this.hover('')}>
                        
                        <Link to={'/dashboard/portfolio'}>
                            <PortfolioBag />
                            <span>My Portfolio</span>
                        </Link>
                    </li>
                    <li className={`two ${path.includes('events') ? 'current' : ''}`}
                        onMouseEnter={() => this.hover('two')}
                        onMouseLeave={() => this.hover('')}>
                        <Link to={'/dashboard/events'}>
                            <EventGraph />
                            <span>Events</span>
                        </Link>
                    </li>
                </ul>

                <hr className="dash-hr"/>

                <ul className="account-links">
                    <h2>My Account</h2>
                    <li className={`three ${path.includes('avatar') ? 'current' : ''}`}
                        onMouseEnter={() => this.hover('three')}
                        onMouseLeave={() => this.hover('')}>
                        <Link to={'/dashboard/avatar'}>Avatar</Link>
                    </li>
                    <li className={`four ${path.includes('settings') ? 'current' : ''}`}
                        onMouseEnter={() => this.hover('four')}
                        onMouseLeave={() => this.hover('')}>
                        <Link to={'/dashboard/settings'}>Settings</Link>
                    </li>
                    <li className="logout-li five" 
                        onMouseEnter={() => this.hover('five')}
                        onMouseLeave={() => this.hover('')}>
                        <button onClick={() => this.confirmLogOut()}>
                            Logout
                            <LogoutIcon />
                        </button>
                    </li>
                </ul>
            </div>
        );
   }
}

const mapStateToProps = state => ({
    item: state.display.item
});


export default withRouter(connect(mapStateToProps)(SideNav));