import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { auth } from '../actions';
import "./Login.css";
import Field from './Field';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            responses: [],
            toDashboard: false
        }
        this.loginUser = this.loginUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ inputField: event.target.value });
    }

    loginUser(event) {
        event.preventDefault();
        let data  = new FormData(event.target);
        this.props.login(data.get('username'), data.get('password'))
        .then(() => {
            this.setState((state) => {
                return {
                    toDashboard: true,
                }
            });
        }).catch(() => {
            console.log(this.props.errors);
        });
        
    }
    
    
    render() {
        if (this.state.toDashboard === true) {
            return <Redirect to='/dashboard/goals/' />
        }

        return (
            <div className="Login">
                <h1>Login</h1>
                <form className="loginForm" onSubmit={this.loginUser}>
                    <div className="form-inner">
                        <Field
                            type="text"
                            for="username"
                            field="username"
                            label="Username"
                        ></Field>
                        <Field
                            type="password"
                            for="password"
                            field="password"
                            label="Password"
                        ></Field>
                        <button type="submit" value="submit">Login ></button>
                        <p>
                        {this.props.errors[0]
                            ? this.props.errors[0].message
                            : ""}

                        </p>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    let errors = [];
    if (state.auth.errors) {
        errors = Object.keys(state.auth.errors).map(field => {
            return { field, message: state.auth.errors[field] };
        });
    }
    return {
        errors,
        isAuthenticated: state.auth.isAuthenticated
    };

}

const mapDispatchToProps = dispatch => {
    return {
        login: (username, password) => {
            return dispatch(auth.login(username, password));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);