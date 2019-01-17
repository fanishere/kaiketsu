import React, { Component } from 'react';
import './Loading.css';
import logo from './media/Logo/logo-1.png';

class Loading extends Component {
    render() {
        return (
            <div className="loading">
                <div className="content">
                    <img className="logo" src={logo} alt="logo"></img>
                    <h1 className="heading">
                        KAIKETSU
                    </h1>

                </div>
            </div>
        )
    }
}


export default Loading;