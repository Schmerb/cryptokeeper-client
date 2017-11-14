import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import CommentForm  from './comment-form';
import ReplyComment from './reply-comment';

export class ReplyComments extends Component {
    
    render() {
        // let content = [["Bitcoin is really skyrocketing, I can't believe how fast it has grown recently.", "theDood"], ["Bitcoin is unstable, I would be careful when purchasing coin.", "threeSixNine"], ["Ehh, its been pretty upward driving. Not too concerned.", "schmerb"]];
        // let comments = content.map((str, key) => (
        //     <li key={key}>
        //         <ReplyComment content={str[0]} author={str[1]} />
        //     </li>
        // ));
        let replyComments = this.props.replyComments;
        replyComments = replyComments.map((replyComment, key) => 
            <li key={key}>
                <ReplyComment replyComment={replyComment} />
            </li>
        );
        const userLoginMsg = (<p className="login-to-comment-msg">
                                <Link to={"/login"}>Log in</Link>
                                <span>or</span>
                                <Link to={"/signup"}>Sign up</Link>
                                <span>to leave a comment</span>
                            </p>);
        return(
            <div className={this.props.className}>
                <ul>
                    {replyComments}
                </ul>
                {this.props.loggedIn ? <CommentForm reply={this.props.commentId}/> : userLoginMsg}
            </div>
        );
    }
}

const mapeStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    user: state.auth.currentUser
});

export default connect(mapeStateToProps)(ReplyComments);