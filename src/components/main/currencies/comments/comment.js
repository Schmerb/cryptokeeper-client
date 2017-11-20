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

    componentWillReceiveProps(nextProps) {
        // console.log('NextProps: ', nextProps);
        if(this.props.data.currency !== nextProps.data.currency) {
            this.setState({
                open: false
            });
        }
    }

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // toggles reply comments to open/close
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    openReplyComments = () => {
        this.setState({
            open: !this.state.open
        });
    };

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Dispatches action to like comment
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    likeComment = (e, commentID) => {
        // checks if user already liked it
        //    a) --> dispatch --> removeUserLike
        // OR
        //    b)  checks if user dislikes comment
        //            a) --> dispatch --> removeUserDislike --> likeComment
        //         OR
        //            b) --> dispatch --> likeComment 


        this.props.likeComment(commentID)
            .then((res) => {
                console.log('likeComment.then() res: ', res);
            });
    };

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Dispatches action to dislike comment
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    dislikeComment = (e, commentID) => {
        // checks if user already disliked it
        //    a) --> dispatch --> removeUserDislike
        // OR
        //    b)  checks if user likes comment
        //            a) --> dispatch --> removeUserLike --> dislikeComment
        //         OR
        //            b) --> dispatch --> dislikeComment 
        this.props.dislikeComment(commentID);
    };
    
    // // // // // //
    //
    // Render
    //
    // // // // // //
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
        // console.log({thisUserLiked, thisUserDisliked});
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
                        
                        {thisUserLiked ? 
                            <ThumbsUpFilled className="thumb up" clickHandler={e => this.likeComment(e, id)} /> 
                            : 
                            <ThumbsUpOutline className="thumb up" clickHandler={e => this.likeComment(e, id)}/>
                        }
                    </label>
                    <label>
                        <span>{dislikes}</span>
                        
                        {thisUserDisliked ? 
                            <ThumbsUpFilled className="thumb down" clickHandler={e => this.dislikeComment(e, id)} /> 
                            :
                            <ThumbsUpOutline className="thumb down" clickHandler={e => this.dislikeComment(e, id)}/>}
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