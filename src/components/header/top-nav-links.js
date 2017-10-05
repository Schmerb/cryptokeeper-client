import React from 'react';
import { Link } from 'react-router-dom';

import GearWheel from 'icons/gear-wheel';

export default class TopNavLinks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openLinks: false
        };
    }

    componentDidMount() {
        console.log('just mounted, props:', this.props);
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps, nextProps:', nextProps);
        let $this = this;
        let delay = nextProps.open ? 0: 400;
        setTimeout(function() {
            $this.setState({
                openLinks: nextProps.open
            });
        }, delay);
    }

    componentWillUpdate(nextProps, nextState) {
        // console.log('componentWillUpdate');
        // console.log('\tnextProps', nextProps);
        // console.log('\tnextState', nextState);
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log('just updated, prevProps:', prevProps);
        // console.log('props', this.props);
    }



    render() {
        let links   = (<ul>
                          <li className="links-li">
                              <Link to={'/login'} onClick={e => this.props.hideMenu()}>Login</Link>
                          </li>
                          <li className="links-li">
                              <Link to={'/signup'} onClick={e => this.props.hideMenu()}>Signup</Link>
                          </li>
                      </ul>);
        if(this.props.loggedIn) {
            links = (<ul>
                        <li className="gear-item">
                            <Link to={'/dashboard'} onClick={e => this.props.hideMenu()}>
                                <GearWheel />
                            </Link>
                        </li>
                        <li>
                            {this.props.username}
                            <img src="/assets/icons/arrow-down.png" className={`arrow-down ${this.props.open ? 'hidden' : ''}`} alt="arrow to open profile menu"/> 
                        </li>
                        <li>
                            <Link className="avatar-link" to="/dashboard" onClick={e => this.props.hideMenu()}>
                                <img src="/assets/icons/tie-avatar.svg" className="tie-avatar" alt="default profile avatar icon with tie"/> 
                            </Link>
                        </li>
                        <li className={`links-li ${!this.props.open ? 'hidden' : ''}`}>
                            <button className="logout-btn" onClick={() => this.props.logOut()}>Logout</button>
                        </li>
                    </ul>);
        }

        return(
            <div className={`links-wrap ${this.state.openLinks ? 'openLinks': ''}`}>
                <li>
                    <ul>
                        <li>{this.state.openLinks ? links : null}</li>
                        <li className="links-li">
                            <Link to={'/'} onClick={e => this.props.hideMenu()}>Home</Link>
                        </li>
                        <li className="links-li">
                            <Link to={'/chat'} onClick={e => this.props.hideMenu()}>LiveChat</Link>
                        </li>
                    </ul>
                </li>
                <li className="user-links">
                    {!this.props.open && !this.state.openLinks ? links : null}
                </li>
            </div>
        );
    }
}
