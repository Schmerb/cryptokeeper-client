import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { addComment, addReplyComment } from 'actions/comments';

export class CommentForm extends Component {

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Hanldes form submit to add comment
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    handleSubmit = (e) => {
        e.preventDefault();
        const value    = this.refs.textarea.value;
        const pathname = this.props.location.pathname;
        // dispatch an action to make fetch to db and update state
        
        console.log(this.props.location);
        let coin = [];
        for(let i=pathname.length - 1; i > 0; i--) {
            // console.log(pathname[i]);
            if(pathname[i] !== '/') {
                coin.push(pathname[i]);
            } else {
                break;
            }
        }
        let currency = coin.reverse().join('');
        console.log('this.props.reply', this.props.reply);
        if(this.props.reply) {
            console.log('currency: ', currency);
            return this.props.addReplyComment(value, this.props.reply, currency);
        }
        this.props.addComment(value, currency);
    }

    render() {
        return(
            <form className="comments-form" action="#!" onSubmit={this.handleSubmit}>
                <textarea name="" ref="textarea" placeholder="Write your comment . . ."></textarea>
                <button type="submit">Post</button>
            </form>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    addComment: (comment, currency) => dispatch(addComment(comment, currency)),
    addReplyComment: (comment, commentID, currency) => dispatch(addReplyComment(comment, commentID, currency))
});

export default withRouter(connect(null, mapDispatchToProps)(CommentForm));