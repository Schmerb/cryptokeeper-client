import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { toggleMenu } from 'actions/display';
import { logUserOut } from 'services/user';
import { scrollIt }   from 'utils/scroll';

import UpArrowCircle from 'icons/up-arrow-circle';
import FacebookIcon  from 'icons/social/facebook-icon';
import GithubIcon    from 'icons/social/github-icon';
import LinkedInIcon  from 'icons/social/linkedin-icon';


export class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fix: false
        };
    }

    componentDidMount() {
        window.addEventListener('scroll', this.getScrollPosition);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.getScrollPosition);
    }

    // * * * * * * * * * * * * * * * * * * * *
    // Checks user scroll position from the 
    // bottom to determine if up arrow should
    // be set to fixed position
    // * * * * * * * * * * * * * * * * * * * *
    getScrollPosition = () => {
        const distFromBottom = document.documentElement.scrollHeight - window.scrollY - window.innerHeight;
        if(distFromBottom <= 230) {
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
    // Scrolls to top of document
    // * * * * * * * * * * * * * * * * * * * *
    handleClick = () => scrollIt(0, 500, 'easeInOutCubic');

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
                            <button className="logout-btn" onClick={this.logOut}>Logout</button>
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
                            <Link to={"https://github.com/Schmerb"} target="__blank">
                                <GithubIcon className="github-icon" />
                            </Link>
                        </li>
                        <li>
                            <Link to={"https://www.facebook.com/mike.schmerbeck"} target="__blank">
                                <FacebookIcon className="facebook-icon" />
                            </Link>
                        </li>
                        <li>
                             <Link to={"https://www.linkedin.com/in/michael-schmerbeck/"} target="__blank">
                                <LinkedInIcon className="linkedIn-icon" />
                            </Link> 
                        </li>
                    </ul>
                </nav>
                <div className="copy">
                    <span>copyright &copy; 2017 <a href="https://www.mikeschmerbeck.com" target="__blank">Mike Schmerbeck</a></span>
                </div>
            </footer>
        );
    }
}


const mapStateToPRops = state => ({
    loggedIn: state.auth.currentUser !== null,
    hasTouch: state.display.hasTouch
});

export default withRouter(connect(mapStateToPRops)(Footer));