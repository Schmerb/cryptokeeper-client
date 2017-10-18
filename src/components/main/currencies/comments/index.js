import React, { Component } from 'react';

import Spinner from 'react-spinkit';
// import TieAvatar from 'icons/tie-avatar';

import CommentList from './comment-list';
import CommentForm from './comment-form';

export default class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        const $this = this;
        setTimeout(function() {
            $this.setState({
                loading: false
            });
        }, 3000);
    }

    render() {
        
        if(this.state.loading) {
            return(
                <div className="comments-container">
                    <div className="loading-icon">
                        <Spinner name="three-bounce" color="coral"/>
                    </div>
                </div>
            );
        }
        return(
            <div className="comments-container">
                <h2>Discussion</h2>
                <div className="inner-container">
                    <CommentList />
                    <CommentForm />
                </div>
            </div>
        );
    }
}