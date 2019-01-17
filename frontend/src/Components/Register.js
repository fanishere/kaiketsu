import React, { Component } from 'react';
import {
    Redirect
} from 'react-router-dom';
import Field from './Field';
import ErrorList from './Errors';
import './Register.css';
import {connect} from "react-redux";
import {auth} from '../actions';


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toGoalPrompt: false
        }
        this.registerAccount = this.registerAccount.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({inputField: event.target.value});
    }

    resetForm() {
        this.setState({
            currentField: 0,
            responses: []
        })
    }

    registerAccount(event) {
        event.preventDefault();
        let data  = new FormData(event.target);

        this.props.register(
            data.get('username'),
            data.get('first_name'),
            data.get('email'),
            data.get('password'))
        .then(() => {
            this.setState((state) => {
                return {
                    toGoalPrompt: true,
                }
            });
        }).catch((error) => {
            this.processErrors();
            console.log(error);
        });
        
        
    }
    
    render() {
        if (this.state.toGoalPrompt === true) {
            return <Redirect to="/dashboard/create-goal/" />
        }
        if (this.props.errors) {

        }

        return (
            <div className="Register">
                <h1>Sign Up</h1>
                <form className="registrationForm" onSubmit={this.registerAccount}>
                    <div className="form-inner">
                        <Field
                            type="text"
                            for="username"
                            field="username"
                            label="Username"
                        ></Field>
                        <Field
                            type="text"
                            for="first_name"
                            field="first_name"
                            label="First Name"
                        ></Field>
                        <Field
                            type="email"
                            for="email"
                            field="email"
                            label="Email"
                        ></Field>
                        <Field
                            type="password"
                            for="password"
                            field="password"
                            label="Password"
                        ></Field>
                        
                        <button type="submit" value="submit">Sign Up ></button>

                    
                        {this.props.errors[0]
                            ? <ErrorList errors={this.props.errors}></ErrorList>
                            : ""}
                     
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
            return {field, message:state.auth.errors[field]};
        });
    }
    return {
        errors,
        isAuthenticated: state.auth.isAuthenticated
    };
    
}

const mapDispatchToProps = dispatch => {
    return {
        register: (username, first_name, email, password) => {
            return dispatch(auth.register(username, first_name, email, password));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);