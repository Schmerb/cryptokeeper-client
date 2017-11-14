import React, { Component } from 'react';
import { connect } from 'react-redux';

import Comment from './comment';

export class CommentList extends Component {
    com
    getComments() {
        return this.props.comments.map((data, key) => 
            <li key={key}>
                <Comment data={data}/>
            </li>
        );
    }

    render() {
        const comments = this.getComments();
        return(
            <ul className="comments-list">
                {comments}
            </ul>
        );
    }
}

const mapStateToProps = state => ({
    comments: state.comments.comments
});

export default connect(mapStateToProps)(CommentList);