import React, { Component } from 'react';
import { connect } from 'react-redux';

import { likeReplyComment, dislikeReplyComment } from 'actions/comments';

import getTimeElapsed from './elapsed-time';

import TieAvatar       from 'icons/tie-avatar';
import ThumbsUpOutline from 'icons/thumbs-up-outline';
import ThumbsUpFilled  from 'icons/thumbs-up-filled';

export class ReplyComment extends Component {

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Dispatches action to like comment
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    likeReplyComment = (e, commentID, replyCommentID) => {
        this.props.likeReplyComment(commentID, replyCommentID);
    };

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Dispatches action to dislike comment
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    dislikeReplyComment = (e, commentID, replyCommentID) => {
        this.props.dislikeReplyComment(commentID, replyCommentID);
    };
    
    // // // // // //
    //
    // Render
    //
    // // // // // //
    render() {
        const { author, content, createdAt, usersLiked, usersDisliked,
            id: replyCommentID, parentComment: commentID } = this.props.replyComment;

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
        const timeElapsed = getTimeElapsed(new Date(createdAt));
        console.log('THIS USER LIKED', thisUserLiked);
        return(
            <div className="comment reply">

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
                        
                        {thisUserLiked ? 
                            <ThumbsUpFilled className="thumb up" clickHandler={e => this.likeReplyComment(e, commentID, replyCommentID)}/> 
                            : 
                            <ThumbsUpOutline className="thumb up" clickHandler={e => this.likeReplyComment(e, commentID, replyCommentID)}/>
                        }
                    </label>
                    <label>
                        <span>{dislikes}</span>
                        
                        {thisUserDisliked ? 
                            <ThumbsUpFilled className="thumb down" clickHandler={e => this.dislikeReplyComment(e, commentID, replyCommentID)}/> 
                            : 
                            <ThumbsUpOutline className="thumb down" clickHandler={e => this.dislikeReplyComment(e, commentID, replyCommentID)}/>
                        }
                    </label>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: state.auth.currentUser
});

const mapDispatchToProps = dispatch => ({
    likeReplyComment: (commentID, replyCommentID) => dispatch(likeReplyComment(commentID, replyCommentID)),
    dislikeReplyComment: (commentID, replyCommentID) => dispatch(dislikeReplyComment(commentID, replyCommentID))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReplyComment);