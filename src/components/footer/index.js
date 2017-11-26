import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { toggleMenu } from 'actions/display';
import { logUserOut } from 'services/user';
import { scrollIt }   from 'utils/scroll';

import UpArrowCircle  from 'icons/up-arrow-circle';


export class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fix: false
        };
        this.getScrollPosition = this.getScrollPosition.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.getScrollPosition);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.getScrollPosition);
    }

    getScrollPosition = () => {
        const distFromBottom = document.documentElement.scrollHeight - window.scrollY - window.innerHeight;
        // console.log("distFromBottom: ", distFromBottom);
        if(distFromBottom <= 210) {
            this.setState({
                fix: true
            });
        } else if(this.state.fix) {
            this.setState({
                fix: false
            });
        }
    };

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

    handleClick = e => {
        console.log('CLICK');
        scrollIt(0, 500, 'easeInOutCubic');
    };

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
        let classes = this.props.location.pathname.includes('dashboard') ? 'dash': '';
        if(this.props.location.pathname.includes('chat/room') && this.props.hasTouch) {
            classes = `${classes} mobilechat`;
        }

        return(
            <footer role="contentinfo" className={classes}>
                <UpArrowCircle className={`f-up-arrow ${this.state.fix?"fix":""}`} onClick={this.handleClick}/>
                <nav className="f-nav">
                    {links}
                    <ul className="social-links">
                        <li>
                            <a href="https://github.com/Schmerb" target="__blank">
                                <i className="fa fa-github" aria-hidden="true"></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.facebook.com/mike.schmerbeck" target="__blank">
                                <i className="fa fa-facebook" aria-hidden="true"></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/michael-schmerbeck-20a8a7126/" target="__blank">
                                <i className="fa fa-linkedin" aria-hidden="true"></i>
                            </a>
                        </li>
                    </ul>
                </nav>
                <div className="copy">
                    <span>copyright &copy; 2017 Mike Schmerbeck</span>
                </div>
            </footer>
        );
    }
}

// 1) 

const mapStateToPRops = state => ({
    loggedIn: state.auth.currentUser !== null,
    hasTouch: state.display.hasTouch
});

export default withRouter(connect(mapStateToPRops)(Footer));