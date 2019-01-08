import React, { Component } from 'react';
import {
    Redirect
} from 'react-router-dom';
import Field from './Field';
import './Register.css';
require('dotenv').config()
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
            axios({
                url: 'http://localhost:8000/api/register/',
                method: 'POST',
                data: {
                    'username': this.state.responses[0],
                    'first_name': this.state.responses[1],
                    'email': this.state.responses[2],
                    'password': this.state.responses[3]
                }
            }).then(response => {
                this.setState(() => ({
                    toGoalPrompt: true
                }))
                console.log(response);
            }).catch(error => {
                console.log(error);
            })
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


export default Register;

