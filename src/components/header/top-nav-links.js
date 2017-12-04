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
    constructor(props) {
        super(props);
        this.state = {
            fullyExtended: true
        };
    }

    componentWillReceiveProps(nextProps) {
        let $this = this;
        let delay = nextProps.open ? 0: 400;
        setTimeout(() => {
            $this.props.dispatch(toggleLinks(nextProps.open));
        }, delay);

        let username = this.checkLength(nextProps.username);
        if(!username.includes('..')) {
            if(!this.state.fullyExtended) {
                this.setState({
                    fullyExtended: true
                });
            }
        } 
        else if(this.state.fullyExtended)  {
            this.setState({
                fullyExtended: false
            });
        } else {
            this.setState({
                fullyExtended: true
            });
        }
    }

    shouldComponentUpdate(nextProps) {
        if(this.props.loggedIn === nextProps.loggedIn
            && this.props.username === nextProps.username
            && this.props.open === nextProps.open
            && this.props.openLinks === nextProps.openLinks
            && this.props.currentPath === nextProps.currentPath
            && this.props.avatar === nextProps.avatar
            && this.props.width !== nextProps.width) {
                if(nextProps.width > 1000 && nextProps.username.length >= 7 && this.state.fullyExtended) {
                    return false;
                }
            }
        return true; 
    }

    // * * * * * * * * * * * * * * * * * * * *
    // logs user out by removing jwt token
    // * * * * * * * * * * * * * * * * * * * *
    logOut = () => {
        logUserOut();
        this.hideMenu();
    }

    // * * * * * * * * * * * * * * * * * * * *
    // hides menu if it is currently open
    // * * * * * * * * * * * * * * * * * * * *
    hideMenu = () => {
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
            let styles = {
                backgroundImage: `url(${this.props.avatar.url})`
            };
            avatarImg = <div className="avatar-wrap" style={styles} ></div>;
        }
        if(this.props.loggedIn) {
            return (<ul>
                        <li className="gear-item">
                            <Link to={'/dashboard/settings'} onClick={this.hideMenu}>
                                <GearWheel />
                            </Link>
                        </li>
                        <li className={`username-li ${this.props.open ? '' : 'closed'}`}>
                            <span className="nav-username">{this.checkLength(this.props.username)}</span>
                            <Link to={"#!"} className={`${this.props.open ? 'hidden' : ''}`}>
                                <ArrowDown/>
                            </Link>
                            <ul className={`sub-menu ${this.props.open ? 'hidden' : ''}`}>
                                <li>
                                    <button className="logout-btn" onClick={this.logOut}>
                                        Logout
                                        <LogoutIcon />
                                    </button>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link className="avatar-link" to="/dashboard/portfolio" onClick={this.hideMenu}>
                                {avatarImg}
                            </Link>
                        </li>
                        <li className={`links-li ${!this.props.open ? 'hidden' : ''}`}>
                            <button className="logout-btn" onClick={this.logOut}>
                                Logout
                                <LogoutIcon />
                            </button>
                        </li>
                    </ul>);
        }
        return  (<ul>
                    <li className="links-li">
                        <Link to={'/login'} onClick={this.hideMenu}>LOGIN</Link>
                    </li>
                    <li className="links-li">
                        <Link to={'/signup'} onClick={this.hideMenu}>SIGNUP</Link>
                    </li>
                </ul>);
    }

    // * * * * * * * * * * * * * * * * * * * *
    // Returns shortened username if
    // necessary to ensure UI does not break
    // * * * * * * * * * * * * * * * * * * * *
    checkLength(username) {
        const len = username.length;
        const width = this.props.width;
        if(len > 13 && width <= 805) {
            username = `${username.slice(0, 13)}..`;
        }
        else if(len > 7) {
            if(width > 930 && width <= 1000) {
                username = `${username.slice(0, 16)}..`;
            }
            else if(width > 875 && width <= 930) {
                username = `${username.slice(0, 10)}..`;
            }
            else if(width > 805 && width <= 875) {
                username = `${username.slice(0, 6)}..`;
            } 
        }
        return username
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
        avatar: state.protectedData.avatar,
        width: state.display.width
    };
};

export default withRouter(connect(mapStateToProps)(TopNavLinks));