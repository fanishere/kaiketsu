import React, { Component } from 'react';
import {
    Redirect
} from 'react-router-dom';
import Field from './Field';
import './Register.css';
import {connect} from "react-redux";
import {auth} from '../actions';
require('dotenv').config();
const axios = require('axios');


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: [
                <Field field='username' type='text'></Field>,
                <Field field='first_name' type='text'></Field>,
                <Field field='email' type='email'></Field>,
                <Field field='password' type='text'></Field>
            ],
            currentField: 0,
            responses: [],
            toGoalPrompt: false
        }
        this.transformForm = this.transformForm.bind(this);
        this.registerAccount = this.registerAccount.bind(this);
    }

    registerAccount() {
        if (this.state.responses.length === 4) {
            this.props.register(...this.state.responses);
            
        }
        
    }

    transformForm(event) {
        event.preventDefault()
        this.setState({
            responses: this.state.responses.concat(event.target[0].value)
        }, this.registerAccount);
        
        if (this.state.currentField < 3) {
            this.setState((state) => {
                return {
                    currentField: state.currentField + 1,
                }
            });
            
        }
        
    }
    
    render() {
        if (this.state.toGoalPrompt === true) {
            return <Redirect to='/loading' />
        }
        return (
            <div className="registration">
                <h1>Register</h1>
                <form className="simform" onSubmit={this.transformForm}>
                    <div className="form-inner">
                        {this.state.fields[this.state.currentField]}
                            
                        <input type="submit" value="Submit" />
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