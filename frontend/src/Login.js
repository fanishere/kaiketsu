import React, { Component } from 'react';
import "./Login.css";


class Login extends Component {


    render() {

        return (
            <div className="Login">
                <form onSubmit={this.loginUser}>
                    <label> Login </label>
                    <input type="text" name="login"></input>

                </form>
            </div>
        )
    }
}

export default Login;