import React, { Component } from 'react';


import TieAvatar       from 'icons/tie-avatar';
import ThumbsUpOutline from 'icons/thumbs-up-outline';
// import ThumbsUpFilled  from 'icons/thumbs-up-filled';

export default class ReplyComment extends Component {

    render() {
        const { author, content, created } = this.props.replyComment;
        console.log('ReplyComment PROPS', this.props);
        return(
            <div className="comment reply">

                <div className="description">
                    <div className="avatar">
                        <TieAvatar />
                    </div>
                    <div className="metadata">
                        <span className="author">{author.username}</span>
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
                </div>
            </div>
        );
    }
}