import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Spinner from 'react-spinkit';
// import TieAvatar from 'icons/tie-avatar';

import { getComments } from 'actions/comments';

import CommentList from './comment-list';
import CommentForm from './comment-form';

export class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        this.props.getComments(this.props.currency);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.currency !== nextProps.currency) {
            this.props.getComments(nextProps.currency);
        }
        if(nextProps.comments.length > 0) {
            this.setState({
                loading: false
            });
        }
        // fallback for empty comments array
        setTimeout(() => {
            this.setState({
                loading: false
            });
        }, 4000);
    }

    render() {
        console.log('CURRENCY', this.props.currency);
        if(this.state.loading) {
            return(
                <div className="comments-container">
                    <div className="loading-icon">
                        <Spinner name="three-bounce" color="coral"/>
                    </div>
                </div>
            );
        }
        const userLoginMsg = (<p className="login-to-comment-msg">
                                <Link to={"/login"}>Log in</Link>
                                <span>or</span>
                                <Link to={"/signup"}>Sign up</Link>
                                <span>to leave a comment</span>
                              </p>);
        return(
            <div className="comments-container">
                <h2>Discussion</h2>
                <div className="inner-container">
                    <CommentList />
                    {this.props.loggedIn ? <CommentForm /> : userLoginMsg}
                </div>
            </div>
        );
    }
}

const mapeStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    user: state.auth.currentUser,
    currentPath: state.display.currentPath,
    comments: state.comments.comments
});

const mapDispatchToProps = dispatch => ({
    getComments: currency => dispatch(getComments(currency))
});

export default connect(mapeStateToProps, mapDispatchToProps)(Comments);