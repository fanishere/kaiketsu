import React, { Component } from 'react';
import { tween } from 'popmotion';
import ReactDOM from 'react-dom';
import {connect} from "react-redux";
import './Interactions.css';
import posed from 'react-pose';
const axios = require('axios');


const SuccessButton = posed.div({
    pressable: true,
    hoverable: true,
    init: { scale: 1 },
    press: { scale: 0.8 },
    hover: { scale: 1.2 }
});

class ButtonInteraction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonText: 'Tap Me',
            disabled: false
        }
        this.goalSuccess = this.goalSuccess.bind(this);
    }

    goalComplete() {
        if (!this.state.disabled && !this.props.disabled) {
            let headers = {
                "Content-Type": "application/json",
                "Authorization": `Token ${this.props.token}`
            };
            return axios({
                url: `${process.env.REACT_APP_API_URL}/api/goals/${this.props.goal}/days/`,
                    method: 'POST',
                    data: {
                        "goal_met": true,
                    },
                    headers: headers
                }).then(res => {
                    console.log(res);
                    this.goalSuccess();
                
                }).catch(error => {
                    console.log(error);
                });
        }
    }

    goalSuccess() {
        this.setState({
            buttonText: 'Congratulations on Finishing Your Goal Today',
            disabled: true
        });
        this.props.reload();
    }

    render() {
        return (
            <SuccessButton
                className="SuccessButton"
                onClick={this.goalComplete.bind(this)}>
                    {this.props.accomplished
                        ? 'Congratulations on Finishing Your Goal Today!'
                        : 'Tap Me!'}
            </SuccessButton>
        );
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


export default connect(mapStateToProps)(ButtonInteraction);
