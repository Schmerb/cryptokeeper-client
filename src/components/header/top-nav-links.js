import React       from 'react';
import { connect } from 'react-redux';
import { Link, withRouter }    from 'react-router-dom';

import { toggleLinks, toggleMenu } from 'actions/display';

import { logUserOut } from 'services/user';

import GearWheel  from 'icons/gear-wheel';
import TieAvatar  from 'icons/tie-avatar';
import ArrowDown  from 'icons/arrow-down';
import LogoutIcon from 'icons/logout-icon';

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

    // * * * * * * * * * * * * * * * * * * * *
    // returns appropriate links depending on 
    // user state
    // * * * * * * * * * * * * * * * * * * * *
    getLinks() {
        let avatarImg = <TieAvatar />;
        if(this.props.avatar) {
            avatarImg = <div className="avatar-wrap">
                            <img className="user-avatar-img" src={this.props.avatar.url} alt="User avatar profile"/>
                        </div>;
            // avatarImg = <img className="user-avatar-img" src={this.props.avatar.url} alt="User avatar profile"/>;
        }
        if(this.props.loggedIn) {
            return (<ul>
                        <li className="gear-item">
                            <Link to={'/dashboard/settings'} onClick={e => this.hideMenu()}>
                                <GearWheel />
                            </Link>
                        </li>
                        <li className={`username-li ${this.props.open ? '' : 'closed'}`}>
                            {this.props.username}
                                <Link to={"#!"} className={`${this.props.open ? 'hidden' : ''}`}>
                                    <ArrowDown/>
                                </Link>
                            <ul className={`sub-menu ${this.props.open ? 'hidden' : ''}`}>
                                <li>
                                    <button className="logout-btn" onClick={() => this.logOut()}>
                                        Logout
                                        <LogoutIcon />
                                    </button>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link className="avatar-link" to="/dashboard/portfolio" onClick={e => this.hideMenu()}>
                                {avatarImg}
                            </Link>
                        </li>
                        <li className={`links-li ${!this.props.open ? 'hidden' : ''}`}>
                            <button className="logout-btn" onClick={() => this.logOut()}>
                                Logout
                                <LogoutIcon />
                            </button>
                        </li>
                    </ul>);
        }
        return  (<ul>
                    <li className="links-li">
                        <Link to={'/login'} onClick={e => this.hideMenu()}>LOGIN</Link>
                    </li>
                    <li className="links-li">
                        <Link to={'/signup'} onClick={e => this.hideMenu()}>SIGNUP</Link>
                    </li>
                </ul>);
    }

    // * * * * * * * * * * * * * * * * * * * *
    // returns current page pathname
    // * * * * * * * * * * * * * * * * * * * *
    getCurrentPage() {
        const path = this.props.currentPath;
        switch(path) {
            case '/':
                return 'home';
            case '/chat':
                return 'chat';
            case '/currencies':
                return 'currencies';
            default:
                return '';
        }
    }

    render() {
        const links = this.getLinks();
        const currentPage = this.getCurrentPage();
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
                        <hr className={`${currentPage}${this.props.openLinks ? ' hidden': ''}`}/>
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
        openLinks: state.display.openLinks,
        currentPath: state.display.currentPath,
        avatar: state.protectedData.avatar
    };
};

export default withRouter(connect(mapStateToProps)(TopNavLinks));