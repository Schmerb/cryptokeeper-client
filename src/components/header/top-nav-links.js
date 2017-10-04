import React from 'react';
import { Link } from 'react-router-dom';


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
        setTimeout(function() {
            $this.setState({
                openLinks: nextProps.open
            });
        }, 300);
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
        let classes = `${this.state.openLinks ? 'openLinks': ''}`;
        let links   = (<ul>
                          <li>
                              <Link to={'/login'} onClick={e => this.props.hideMenu()}>Login</Link>
                          </li>
                          <li>
                              <Link to={'/signup'} onClick={e => this.props.hideMenu()}>Signup</Link>
                          </li>
                      </ul>);
        let user = null;
        if(this.props.loggedIn) {
            user  = (<li className="welcome-msg"> 
                        <Link className="avatar-link" to="/dashboard">
                            <img src="/assets/icons/tie-avatar.svg" className="tie-avatar" alt="default profile avatar icon with tie"/> 
                            {this.props.username}
                        </Link>
                    </li>);
            links = (<ul>
                        {!this.props.open ? user : null}
                        <li><button className="logout-btn" onClick={() => this.props.logOut()}>Logout</button></li>
                    </ul>);
        }

        return(
            <div className={`links-wrap ${classes}`}>
                <li>
                    <ul>
                        {this.props.open ? user: null}
                        <li>
                            <Link to={'/'} onClick={e => this.props.hideMenu()}>Home</Link>
                        </li>
                        <li>
                            <Link to={'/chat'} onClick={e => this.props.hideMenu()}>LiveChat</Link>
                        </li>
                    </ul>
                </li>
                <li className="user-links">
                    {links}
                </li>
            </div>
        );
    }
}
