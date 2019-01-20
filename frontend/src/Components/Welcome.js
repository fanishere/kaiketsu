import React, { Component } from 'react';
import Reveal from 'react-reveal/Reveal';
import './Welcome.css';
import './Transitions.css';
import logo from './media/Logo/logo-cropped-1.png';
import Fade from 'react-reveal/Fade';
import {
    Link
} from "react-router-dom";
import { CSSTransitionGroup } from 'react-transition-group';

class Welcome extends Component {
    render() {
        return (
            <CSSTransitionGroup
                transitionName="example"
                transitionAppear={true}
                transitionAppearTimeout={1000}
                transitionEnter={true}
                transitionLeave={true}>

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
                    <div className="welcome-button">
                        <Link to="/register/">
                            <button type="submit" value="submit">Join</button>
                        </Link>
                    </div>
                    <div className="welcome-button">
                        <Link to="/login/">
                            <button type="submit" value="submit">Login</button>
                        </Link>
                    </div>

                </div>
            </CSSTransitionGroup>

        );

    }

}



export default Welcome;