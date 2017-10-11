import React       from 'react';
import { connect } from 'react-redux';
import { Link }    from 'react-router-dom';

import { toggleLinks, toggleMenu } from 'actions/display';

import { logUserOut } from 'services/user';

import GearWheel from 'icons/gear-wheel';
import TieAvatar from 'icons/tie-avatar';

export class TopNavLinks extends React.Component {

    componentDidMount() {
        // console.log('just mounted, props:', this.props);
    }

    componentWillReceiveProps(nextProps) {
        // console.log('componentWillReceiveProps, nextProps:', nextProps);
        let $this = this;
        let delay = nextProps.open ? 0: 400;
        setTimeout(() => {
            $this.props.dispatch(toggleLinks(nextProps.open));
        }, delay);
    }

    componentWillUpdate(nextProps, nextState) {
        // console.log('componentWillUpdate');
        // console.log('\tnextProps', nextProps);
        // console.log('\tnextState', nextState);
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log('just updated, prevProps:', prevProps);
    }

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
        let links   = (<ul>
                          <li className="links-li">
                              <Link to={'/login'} onClick={e => this.hideMenu()}>Login</Link>
                          </li>
                          <li className="links-li">
                              <Link to={'/signup'} onClick={e => this.hideMenu()}>Signup</Link>
                          </li>
                      </ul>);
        if(this.props.loggedIn) {
            links = (<ul>
                        <li className="gear-item">
                            <Link to={'/dashboard/settings'} onClick={e => this.hideMenu()}>
                                <GearWheel />
                            </Link>
                        </li>
                        <li className={`username-li ${this.props.open ? '' : 'closed'}`}>
                            {this.props.username}
                            <a href="#!" className={`${this.props.open ? 'hidden' : ''}`}>
                                <img src="/assets/icons/arrow-down.png" className="arrow-down" alt="arrow to open profile menu"/> 
                            </a>
                            <ul className={`sub-menu ${this.props.open ? 'hidden' : ''}`}>
                                <li>
                                    <button className="logout-btn" onClick={() => this.logOut()}>Logout</button>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link className="avatar-link" to="/dashboard/portfolio" onClick={e => this.hideMenu()}>
                                <TieAvatar />
                            </Link>
                        </li>
                        <li className={`links-li ${!this.props.open ? 'hidden' : ''}`}>
                            <button className="logout-btn" onClick={() => this.logOut()}>Logout</button>
                        </li>
                    </ul>);
        }

        return(
            <div className={`links-wrap ${this.props.openLinks ? 'openLinks': ''}`}>
                <li>
                    <ul className={!this.props.openLinks ? 'main-links': ''}>
                        <li>{this.props.openLinks ? links : null}</li>
                        <li className="links-li one">
                            <Link to={'/'} onClick={e => this.hideMenu()}>Home</Link>
                        </li>
                        {/* <li className="links-li two">
                            <Link to={'/'} onClick={e => this.hideMenu()}>Dashboard</Link>
                        </li> */}
                        <li className="links-li two">
                            <Link to={'/chat'} onClick={e => this.hideMenu()}>LiveChat</Link>
                        </li>
                        <li className="links-li three">
                            <Link to={'/currencies'} onClick={e => this.hideMenu()}>Currencies</Link>
                        </li>
                        <hr className={this.props.openLinks ? 'hidden': ''}/>
                    </ul>
                </li>
                <li className="user-links">
                    {!this.props.open && !this.props.openLinks ? links : null}
                </li>
            </div>
        );
    }
}


const mapStateToProps = state => {
    const { currentUser } = state.auth;
    return {
        loggedIn: state.auth.currentUser !== null,
        username: currentUser ? state.auth.currentUser.username : '',
        open: state.display.open,
        openLinks: state.display.openLinks
    };
};

export default connect(mapStateToProps)(TopNavLinks);