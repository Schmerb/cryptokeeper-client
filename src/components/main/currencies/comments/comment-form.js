import React, { Component } from 'react';

export default class CommentForm extends Component {

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Hanldes form submit to add comment
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this);
    }

    render() {
        return(
            <form className="comments-form" action="#!" onSubmit={this.handleSubmit}>
                <textarea name="" id="" placeholder="Write your comment . . ."></textarea>
                <button type="submit">Post</button>
            </form>
        );
    }
}