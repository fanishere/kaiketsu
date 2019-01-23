import React, { Component } from 'react';
import Reveal from 'react-reveal/Reveal';
import './Welcome.css';
import logo from '../media/Logo/logo-cropped-1.png';
import Fade from 'react-reveal/Fade';
import {
    Link
} from "react-router-dom";

class Welcome extends Component {

    getRandomPhrase() {
        let phraseNumber = Math.floor(Math.random() * (this.state.phrases.length));
        return this.state.phrases[phraseNumber];
    }


    render() {
        return (
                <div className="welcome">

                    <img className="welcome-logo" src={logo} alt="logo"></img>
                    <h1 className="heading">
                        KAIKETSU
                    </h1>
                    <div className="quote">
                        <Fade top>
                            <h2>What would you do if you knew you could not fail?</h2>
                        </Fade>
                    </div>
                    <div className="welcomeButtons">
                        
                            <Link to="/register/">Join
                            </Link>
                        
                        
                            <Link to="/login/">Login
                            </Link>
                        
                    </div>

                </div>

        );

    }

}



export default Welcome;