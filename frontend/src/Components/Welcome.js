import React, { Component } from 'react';
import Reveal from 'react-reveal/Reveal';
import './Welcome.css';
import logo from './media/logo.png';
import Fade from 'react-reveal/Fade';


class Welcome extends Component {
    render() {
        return (
            <div className="welcome">
                <div className="content">
                    <img className="welcome-logo" src={logo} alt="logo"></img>
                    <h1 className="heading">
                        KAIKETSU
                    </h1>
                    <div className="quote">
                        <Fade top>
                            <h2>What would you do if you knew you could not fail?</h2>
                        </Fade>
                    </div>
                    <div className="welcome-button">
                        <button type="submit" value="submit">Join</button>
                    </div>
                    <div className="welcome-button">
                        <button type="submit" value="submit">Login</button></div>
                </div>
            </div >

        );

    }

}






export default Welcome;