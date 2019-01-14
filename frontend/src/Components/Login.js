import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from '../actions';
import "./Login.css";
import Field from './Field';
const axios = require('axios');


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: [
                {
                    field: 'username',
                    type: 'text'
                },
                {
                    field: 'password',
                    type: 'password'
                }
            ],
            inputField: "",
            currentField: 0,
            responses: [],
            toDashboard: false
        }
        this.transformForm = this.transformForm.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    handleChange(event) {
        this.setState({ inputField: event.target.value });
    }

    loginUser() {
        if (this.state.responses.length === 2) {
            this.props.login(this.state.responses[0], this.state.responses[1])
                .then(() => {
                    this.setState((state) => {
                        return {
                            toDashboard: true,
                        }
                    });
                }).catch(() => {
                    console.log(this.props.errors);
                    this.resetForm();
                });
        }

    }

    transformForm(event) {
        event.preventDefault()
        let value = this.state.inputField;
        this.setState({
            responses: this.state.responses.concat(value)
        }, this.loginUser);
        this.setState({
            inputField: ""
        });
        if (this.state.currentField < 1) {
            this.setState((state) => {
                return {
                    currentField: state.currentField + 1,
                }
            });

        }

    }

    resetForm() {
        this.setState({
            currentField: 0,
            responses: []
        })
    }

    render() {
        if (this.state.toDashboard === true) {
            return <Redirect to='/dashboard/goals' />
        }

        return (
            <div className="login">
                <h1>Login</h1>
                <form className="simform" onSubmit={this.transformForm}>
                    <div className="form-inner">
                        <label
                            htmlFor={this.state.fields[this.state.currentField].field}>
                            {this.state.fields[this.state.currentField].field.toUpperCase()}</label>
                        <input
                            field={this.state.fields[this.state.currentField].field}
                            type={this.state.fields[this.state.currentField].type}
                            onChange={this.handleChange}
                            value={this.state.inputField} />
                        <input type="submit" value="Submit" />
                        <p>
                            {this.props.errors.length > 0
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