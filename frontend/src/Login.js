import React, {Component} from "react";
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
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
            password: ''
        }
        this.transformForm = this.transformForm.bind(this);
        this.loginUser = this.loginUser.bind(this);
    }

    loginUser() {
        if (this.state.responses.length === 2) {
            axios({
                url: 'http://localhost:8000/api/login/',
                method: 'POST',
                data: {
                    'username': this.state.responses[0],
                    'password': this.state.responses[1]
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
    return {};
}

const mapDispatchToProps = state => {
    return {};
}

export default Login;