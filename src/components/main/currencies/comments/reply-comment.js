import React, { Component } from 'react';


import TieAvatar       from 'icons/tie-avatar';
import ThumbsUpOutline from 'icons/thumbs-up-outline';
// import ThumbsUpFilled  from 'icons/thumbs-up-filled';

export default class ReplyComment extends Component {

    render() {
        return(
            <div className="comment reply">

                <div className="description">
                    <div className="avatar">
                        <TieAvatar />
                    </div>
                    <div className="metadata">
                        <span className="author">{this.props.author}</span>
                        <span className="timestamp">posted 3 hours ago</span>
                    </div>
                </div>

                <div className="content">
                    <p>{this.props.content}</p>
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