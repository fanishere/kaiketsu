import React, {Component} from "react";
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {auth} from '../actions';
import "./Login.css";
import Field from './Field';
const axios = require('axios');


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: [
                <Field field='username' type='text'></Field>,
                <Field field='password' type='text'></Field>
            ],
            currentField: 0,
            responses: [],
            toGoalPrompt: false,
            username: '',
            password: '',
        }
        this.transformForm = this.transformForm.bind(this);
        this.loginUser = this.loginUser.bind(this);
    }

    loginUser() {
        if (this.state.responses.length === 2) {
            this.props.login(this.state.responses[0], this.state.responses[1])
        }
        
    }

    transformForm(event) {
        event.preventDefault()
        this.setState({
            responses: this.state.responses.concat(event.target[0].value)
        }, this.loginUser);
        
        if (this.state.currentField < 3) {
            this.setState((state) => {
                return {
                    currentField: state.currentField + 1,
                }
            });
            
        }
        
    }
    
    render() {
        // if (this.state.toGoalPrompt === true) {
        //     return <Redirect to='/loading' />
        // }
        return (
            <div className="login">
                <h1>Login</h1>
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
        login: (username, password) => {
            return dispatch(auth.login(username, password));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);