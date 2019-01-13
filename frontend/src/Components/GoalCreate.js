import React, { Component } from 'react';
import './Loading.css';
import logo from './media/logo.png';
import {connect} from "react-redux";
import {
    Redirect
} from "react-router-dom";
const axios = require('axios');

class GoalCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            toDashboard: false,
        }
    }

    createGoal(event) {
        event.preventDefault();
        let headers = {
            "Content-Type": "application/json",
            "Authorization": `Token ${this.props.token}`
        };
        
        let formData = new FormData(event.target);
        console.log(formData.get('resolution'));
        console.log(formData.get('duration'));
        console.log(formData.get('reason'));

        return axios({
            url: `${process.env.REACT_APP_API_URL}/api/goals/`,
                method: 'POST',
                data: {
                    "resolution": formData.get('resolution'),
                    "reason": formData.get('reason'),
                    "duration": 'ONE MONTH',
                    "category": this.props.match.params.id
                },
                headers: headers
            }).then(res => {
                console.log(res);
                this.setState({
                    data: res.data
                });
                this.successMessage();
    
            }).catch(error => {
                console.log(error);
            });
    }

    successMessage() {
        console.log("successful!");
        
    }


    render() {
        if (this.state.toDashboard === true) {
            return <Redirect to={`/dashboard/goals/`} />;
        }
        return (
            <div>
                <h1>Create Goal</h1>
                <h2>{this.props.match.params.category}</h2>
                <form onSubmit={this.createGoal.bind(this)}>
                    <span>
                        I want to
                        <input htmlFor="resolution" type="text" name="resolution"></input>
                        everyday for
                        <select htmlFor="duration" name="duration">
                            <option value="ONE MONTH">ONE MONTH</option>
                            <option value="THREE MONTHS">THREE MONTHS</option>
                            <option value="ONE YEAR">ONE YEAR</option>
                        </select>
                        because
                        <input htmlFor="reason" type="text" name="reason"></input>
                        .
                    </span>
                    <button>Create</button>
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
        isAuthenticated: state.auth.isAuthenticated,
        token: localStorage.getItem("token"),
    };
    
}

export default connect(mapStateToProps)(GoalCreate);