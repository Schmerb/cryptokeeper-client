import React, { Component } from 'react';
import { connect } from 'react-redux';

import Comment from './comment';

export class CommentList extends Component {
    
    getComments() {
        return this.props.comments.map((data, key) => 
            <li key={key}>
                <Comment data={data}/>
            </li>
        );
    }

    render() {
        console.log(this.props.comments);
        const comments = this.getComments();
        console.log('\n\n\nRENDERING COMMENT LIST\n\n\n');
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