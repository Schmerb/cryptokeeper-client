import React from 'react';

import Comment from './comment';

let content = [["Bitcoin is really skyrocketing, I can't believe how fast it has grown recently.", "theDood"], ["Bitcoin is unstable, I would be careful when purchasing coin.", "threeSixNine"], ["Ehh, its been pretty upward driving. Not too concerned.", "schmerb"]];
let comments = content.map((str, key) => (
    <li key={key}>
        <Comment content={str[0]} author={str[1]}/>
    </li>
));

export default function CommentList(props) {
    return(
        <ul className="comments-list">
            {comments}
        </ul>
    );
}