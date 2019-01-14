import React, { Component } from 'react';
import Reveal from 'react-reveal/Reveal';
import './Welcome.css';
import logo from './media/logo.png';
import Fade from 'react-reveal/Fade';

// import Button from 'muicss/lib/react/button';


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
                </div >
            </div>
        );

    }

}


class Button extends Component {
    render() {
        return (
            <button
                className="btn btn-default"
                style={buttonStyle}
                onClick={this.props.handleClick}>{this.props.label}</button>
        );
    }
}





module.exports = Button;
export default Welcome;