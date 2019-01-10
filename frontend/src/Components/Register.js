import React, { Component } from 'react';
import {
    Redirect
} from 'react-router-dom';
import Field from './Field';
import './Register.css';
import {connect} from "react-redux";
import {auth} from '../actions';
require('dotenv').config();


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: [
                {
                    field: 'username',
                    type: 'text'
                },
                {
                    field: 'first_name',
                    type: 'text'
                },
                {
                    field: 'email',
                    type: 'email'
                },
                {
                    field: 'password',
                    type: 'password'
                }
            ],

            fields2: [
                <Field field='username' type='text'></Field>,
                <Field field='first_name' type='text'></Field>,
                <Field field='email' type='email'></Field>,
                <Field field='password' type='password'></Field>
            ],
            inputField: "",
            currentField: 0,
            responses: [],
            toGoalPrompt: false
        }
        this.transformForm = this.transformForm.bind(this);
        this.registerAccount = this.registerAccount.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.resetForm = this.resetForm.bind(this);
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

    registerAccount() {
        if (this.state.responses.length === 4) {
            this.props.register(...this.state.responses)
            .then(() => {
                this.setState((state) => {
                    return {
                        toGoalPrompt: true,
                    }
                });
            }).catch(() => {
                this.resetForm();
            });
        }
        
    }

    transformForm(event) {
        event.preventDefault();
        let value = this.state.inputField;
        this.setState({
            responses: this.state.responses.concat(value)
        }, this.registerAccount);
        this.setState({
            inputField: ""
        });
        if (this.state.currentField < 3) {
            this.setState((state) => {
                return {
                    currentField: state.currentField + 1,
                }
            });
            
        }
        
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
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
                        {this.props.errors[0]
                            ? this.capitalizeFirstLetter(this.props.errors[0].message.replace("This field", this.props.errors[0].field))
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
        console.log(state.auth.errors);
        errors = Object.keys(state.auth.errors).map(field => {
            return {field, message:state.auth.errors[field][0]};
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