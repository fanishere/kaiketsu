import React, { Component } from 'react';
// import Reveal from 'react-reveal/Reveal';
import './Welcome.css';
import logo from './media/logo.png';
import Button from 'muicss/lib/react/button';


class Welcome extends Component {
    render() {
        return (
            <div className="welcome">
                <div className="content">
                    <img className="welcome-logo" src={logo} alt="logo"></img>
                    <h1 className="heading">
                        KAIKETSU
                    </h1>
                    <h2 className="quote">
                        What would you do if you knew you could not fail?
                    </h2>
                    {/* <div className="button">
                        <Button>button</Button>
                        <Button color="primary">button</Button>
                    </div> */}
                </div>
            </div>
        )
    }
}
function Button() {
    return (
        React.createElement("button", null, "Go")
    );
}


export default Welcome;