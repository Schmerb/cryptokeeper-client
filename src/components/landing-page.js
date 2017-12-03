import React, { Component } from 'react';
import { Cookies } from 'react-cookie';

export default class LandingPage extends Component {

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // Sets visited cookie to true and sends user to home page
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    handleClick = e => {
        const cookies = new Cookies();
        let obj = {
                visited: true
            };
        cookies.set('cryptokeeper', obj);
        this.props.history.push({
            'pathname': '/'
        });
    };

    render() {
        return(
            <div className="landing-page">
                <div className="inner-container">
                    <h1>CryptoKeep<i className="fa fa-btc" aria-hidden="true"></i>r</h1>

                    <p className="proj-overview">Fullstack Capstone (M.E.R.N. stack) for Thinkful's Fullstack Web Development Bootcamp</p>

                    

                    <p>CryptoKeeper is a real-time cryptocurrency tracking application. It keeps users up to date on the current crypto currency market providing current data for some of the more popular currencies.</p> 

                   

                    <p>Users can sign up for an account to create custom notification events that will trigger when a given condition is met.<br/><span className="example">e.g. 'Bitcoin just reached $12K'</span><span className="example">e.g. 'Ethereum dropped by 5%'</span></p>

                    

                    <p>Users choose this condition and can also choose to receive the notification via <em>text message</em>, <em>email</em>, <em>or both</em> along with a custom message and the current coin price.</p>

                    <label className="demo-label">
                        DEMO Account
                        <ul>
                            <li>username: demo</li>
                            <li>password: demopassword</li>
                        </ul>
                    </label>

                    <button type="button" onClick={this.handleClick}>Check it Out</button>
                </div>
            </div>
        );
    }
}