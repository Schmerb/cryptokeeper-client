import React, { Component } from 'react';
import { connect } from 'react-redux';

import { likeComment, dislikeComment } from 'actions/comments';
import { getAvatar } from 'actions/protected-data';

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

    componentDidMount() {
        // dispatch action to fetch user avatar if it exists
        const { avatar } = this.props.data.author;
        if(avatar.length > 0) {
            console.log('\n\nAVATAR', avatar);
            this.props.getAvatar(avatar);
        }
    }

    componentWillReceiveProps(nextProps) {
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
        this.props.likeComment(commentID)
            .then((res) => {
                console.log('likeComment.then() res: ', res);
            });
    };

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Dispatches action to dislike comment
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    dislikeComment = (e, commentID) => {
        this.props.dislikeComment(commentID);
    };
    
    // // // // // // // // // // //
    //
    // Render
    //
    // // // // // // // // // // //
    render() {
        // console.log('\n\n\ncomment data:', this.props.data);
        const { author, content, createdAt, id, 
                replyComments, usersLiked, usersDisliked, avatarUrl} = this.props.data;

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

        return(
            <div className="comment">

                <div className="description">
                    <div className="avatar">
                        {this.props.data.avatarUrl ?
                            <img className="user-avatar-img" src={this.props.data.avatarUrl} alt="User avatar"/>
                            :
                            <TieAvatar />
                        }
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
    dislikeComment: commentID => dispatch(dislikeComment(commentID)),
    getAvatar: imgId => dispatch(getAvatar(imgId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Comment);