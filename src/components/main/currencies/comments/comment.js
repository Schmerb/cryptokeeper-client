import React, { Component } from 'react';
import { connect } from 'react-redux';

import { likeComment, dislikeComment } from 'actions/comments';

import ReplyComments from './reply-comments';

import getTimeElapsed from './elapsed-time';

import TieAvatar       from 'icons/tie-avatar';
import ThumbsUpOutline from 'icons/thumbs-up-outline';
import ThumbsUpFilled  from 'icons/thumbs-up-filled';

export class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    openReplyComments = () => {
        this.setState({
            open: !this.state.open
        });
    };

    likeComment = (e, commentID) => {
        this.props.likeComment(commentID);
    };

    dislikeComment = (e, commentID) => {
        this.props.dislikeComment(commentID);
    };
    
    render() {
        const { author, content, createdAt, id, 
                replyComments, usersLiked, usersDisliked} = this.props.data;

        let username = 'Account Deactivated'; // fallback for comments whos author removed their account
        if(author) {
            username = author.username;
        }
        const likes    = usersLiked.length;
        const dislikes = usersDisliked.length;
        let thisUserLiked    = false;
        let thisUserDisliked = false;
        for(let user of usersLiked) {
            if(this.props.currentUser && user.username === this.props.currentUser.username) {
                thisUserLiked = true;
                break;
            }
        }
        for(let user of usersDisliked) {
            if(this.props.currentUser && user.username === this.props.currentUser.username) {
                thisUserDisliked = true;
                break;
            }
        }
        console.log({thisUserLiked, thisUserDisliked});
        const timeElapsed = getTimeElapsed(new Date(createdAt));

        return(
            <div className="comment">

                <div className="description">
                    <div className="avatar">
                        <TieAvatar />
                    </div>
                    <div className="metadata">
                        <span className="author">{username}</span>
                        <span className="timestamp">posted {timeElapsed}</span>
                    </div>
                </div>

                <div className="content">
                    <p>{content}</p>
                </div>

                <div className="interactions">
                    <label htmlFor="">
                        <span>{likes}</span>
                        <ThumbsUpOutline className="thumb up" clickHandler={e => this.likeComment(e, id)}/>
                        {thisUserLiked ? <ThumbsUpFilled className="thumb up" /> : null}
                    </label>
                    <label>
                        <span>{dislikes}</span>
                        <ThumbsUpOutline className="thumb down" clickHandler={e => this.dislikeComment(e, id)}/>
                        {thisUserDisliked ? <ThumbsUpFilled className="thumb down" /> : null}
                    </label>
                    <button onClick={this.openReplyComments}>{this.state.open?'hide':'view'} comments</button>
                </div>

                <ReplyComments className={`reply-comments-list ${this.state.open?'open':''}`} 
                               replyComments={replyComments} 
                               commentId={id}/>
            </div>
        );
    };
};

const mapStateToProps = state => ({
    currentUser: state.auth.currentUser
});

const mapDispatchToProps = dispatch => ({
    likeComment: commentID => dispatch(likeComment(commentID)),
    dislikeComment: commentID => dispatch(dislikeComment(commentID))
});

export default connect(mapStateToProps, mapDispatchToProps)(Comment);