import React, { Component } from 'react';
import {
    Redirect
} from 'react-router-dom';
import Field from './Field';
import ErrorList from './Errors';
import './Register.css';
import {connect} from "react-redux";
import {auth} from '../actions';
import './Transitions.css';
import { CSSTransitionGroup } from "react-transition-group";


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
            console.log(error);
        });
        
        
    }
    
    render() {
        if (this.state.toGoalPrompt === true) {
            return <Redirect to="/login/" />
        }
        if (this.props.errors) {

        }

        return (
            // <CSSTransitionGroup
            //                     // key={location.key}
            //                     transitionAppear={true}
            //                     transitionEnter={true}
            //                     transitionLeave={true}
            //                     transitionAppearTimeout={5000}
            //                     transitionEnterTimeout={5000}
            //                     transitionLeaveTimeout={5000}
            //                     transitionName={'SlideIn'}
            //                 >
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
            // </CSSTransitionGroup>
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