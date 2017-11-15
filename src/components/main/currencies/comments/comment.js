import React, { Component } from 'react';

import ReplyComments from './reply-comments';

import TieAvatar       from 'icons/tie-avatar';
import ThumbsUpOutline from 'icons/thumbs-up-outline';
// import ThumbsUpFilled  from 'icons/thumbs-up-filled';

export default class Comment extends Component {
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
    
    render() {
        const { author, content, created, id, replyComments } = this.props.data;

        console.log('\n\nRENDERING COMMENT ', this.props.data, '\n\n');

        let username = 'Account Deactivated';
        if(author) {
            username = author.username;
        }

        return(
            <div className="comment">

                <div className="description">
                    <div className="avatar">
                        <TieAvatar />
                    </div>
                    <div className="metadata">
                        <span className="author">{username}</span>
                        <span className="timestamp">{created}</span>
                    </div>
                </div>

                <div className="content">
                    <p>{content}</p>
                </div>

                <div className="interactions">
                    <label htmlFor="">
                        <span>5</span>
                        <ThumbsUpOutline className="thumb up"/>
                    </label>
                    <label>
                        <span>2</span>
                        <ThumbsUpOutline className="thumb down"/>
                    </label>
                    <button onClick={this.openReplyComments}>{this.state.open?'hide':'view'} comments</button>
                </div>

                <ReplyComments className={`reply-comments-list ${this.state.open?'open':''}`} 
                               replyComments={replyComments} 
                               commentId={id}/>
            </div>
        );
    }
}