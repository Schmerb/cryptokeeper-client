# CryptoKeeper (Client)
Fullstack (React) Capstone Project from [Thinkful's](https://www.thinkful.com/) Fullstack Web Development program. 

## Project Requirements

Project Must:

* Do something interesting or useful.
* Be a fullstack app using HTML, CSS, React, Node, Express, and Mongoose.
* The client and API should be deployed separately and stored in separate GitHub repos.
* Both client- and server-side code should be tested, and you should use TravisCI for continuous integration and deployment.
* Your app should be responsive, and should work just as well on mobile devices as it does on desktop devices.
* All code should be high quality, error free, commented as necessary, and clean.
* The styling on your client should be polished.
* Your app should have a landing page that explains what the app does and how to get started, in addition to pages required to deliver the main functionality.
* provide DEMO account credentials

## Screenshots

My Currencies 

![My Currencies Page](./working-screenshots/desktop-currencies-compressor.png?raw=true "My Currencies Page")

My Events Page

![Events Page](./working-screenshots/desktop-events-compressor.png?raw=true "Events Page")

Add Event Form

![Event Form](./working-screenshots/desktop-event-form-full-compressor.png?raw=true "Event Form")


Account Settings 

![Account Settings Page](./working-screenshots/desktop-account-compressor.png?raw=true "Account Settings Page")

Currency Stats/Forum Page

![Bitcoin Page](./working-screenshots/desktop-currency-page-compressor.png?raw=true "Bitcoin Page")

Socket.IO Chat Room

![Chat Room Page](./working-screenshots/desktop-chat-compressor.png?raw=true "Chat Room Page")

Responsive Mobile Views

![Mobile Views](./working-screenshots/mobile-views-compressor.png?raw=true "Mobile Views")

## Live [DEMO](https://www.cryptokeeper.co/)
* username: demo
* password: demopassword

## Description
CryptoKeeper is a cryptocurrency tracking application using real-time market data via [Socket.IO](https://socket.io/) and [Cryptocompare](https://www.cryptocompare.com/). The current cryptocurrencies tend be quite volatile compared to more traditional currencies and stocks with prices sometimes dropping or increasing drastically in a matter of hours. By registering for an account, users can overcome the uncertaintity of keeping up with the market by creating custom events to monitor a given currency for a specific condition.

 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 (e.g. Bitcoin just reached $12k, Ethereum dropped 5%) 
 
 If and when a condition is eventually met, a notification will be sent to the user via text message and/or email indicating the current price. User's have control over each event condition as well as the method of deilvery and custom message that will be displayed with the notification.

## Technology
* Production (Frontend / Client)
  * HTML5
  * SCSS
  * JavaScript
  * [React.js](https://reactjs.org/redux)
  * [Redux](https://redux.js.org/)
  * [Socket.IO](https://socket.io/)
  * [React Slick](https://github.com/akiran/react-slick)
  * [React Google Charts](https://www.npmjs.com/package/react-google-charts)
* Development
  * [Jest](https://facebook.github.io/jest/) / [Enzyme](https://github.com/airbnb/enzyme)
      * testing librariesenzyme
  * [TravisCI](https://travis-ci.org/)
      * Continuous Integration testing that tests latest build before deploying to production environment
  * [Gulp](https://gulpjs.com/) 
      * task manager that compiles my scss to css and minifies the resulting file


## Notes
* Hosted on [Netlify](https://netlify.com/)'s Cloud Application Platform 
    * (PaaS) platform as a service
* Responsive, mobile first design strategy 
* All tests handled by [Jest](https://facebook.github.io/jest/) / [Enzyme](https://github.com/airbnb/enzyme) testing libraries
* APIs
  * Market data is powered by the [Cryptocompare](https://www.cryptocompare.com/) API and websocket