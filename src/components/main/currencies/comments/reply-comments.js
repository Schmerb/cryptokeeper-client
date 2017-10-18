import React, { Component } from 'react';

import CommentForm  from './comment-form';
import ReplyComment from './reply-comment';

export default class ReplyComments extends Component {
    
    render() {
        let content = [["Bitcoin is really skyrocketing, I can't believe how fast it has grown recently.", "theDood"], ["Bitcoin is unstable, I would be careful when purchasing coin.", "threeSixNine"], ["Ehh, its been pretty upward driving. Not too concerned.", "schmerb"]];
        let comments = content.map((str, key) => (
            <li key={key}>
                <ReplyComment content={str[0]} author={str[1]}/>
            </li>
        ));
        return(
            <div className={this.props.className}>
                <ul>
                    {comments}
                </ul>
                <CommentForm />
            </div>
        );
    }
}