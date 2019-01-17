import React, { Component } from 'react';
import './Loading.css';
import logo from './media/Logo/logo-1.png';
import {connect} from "react-redux";
import {
    Redirect
} from "react-router-dom";
const axios = require('axios');

class CheckIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            toDashboard: false,
        }
    }

    goalComplete() {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": `Token ${this.props.token}`
        };
        return axios({
            url: `${process.env.REACT_APP_API_URL}/api/goals/${this.props.match.params.id}/days/`,
                method: 'POST',
                data: {
                    "goal_met": true,
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
        this.setState({
            toDashboard: true
        });

        
    }


    render() {
        if (this.state.toDashboard === true) {
            return <Redirect to={`/dashboard/goals/`} />;
        }
        return (
            <div>
                <h1>Check In</h1>
                <button onClick={this.goalComplete.bind(this)}>Check In</button>

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

export default connect(mapStateToProps)(CheckIn);