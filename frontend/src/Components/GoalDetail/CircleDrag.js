import React, { Component } from 'react';
import {connect} from "react-redux";
import './Interactions.css';
import posed from 'react-pose';
import { tween, easing } from 'popmotion'; 
const axios = require('axios');

const DraggableCircle = posed.div({
    hoverable: true,
    draggable: 'x',
    init: { left: 0 },
    dragBounds: { left: 0, right: window.innerWidth - 85 },
    dragEnd: {
        transition: ({ position, goalComplete }) =>
            tween({
                from: position,
                to: window.innerWidth - 85,
                duration: 1000,
                ease: easing.circIn,
            })
                
    }
});

const CircleSlot = posed.div({
    init: { right: 0 },
});

class CircleDrag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonText: 'Tap Me',
            disabled: false,
            isVisible: true,
            ballPosition: 0
        }
        this.goalComplete = this.goalComplete.bind(this);
        this.goalSuccess = this.goalSuccess.bind(this);
        console.log(this.props);
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
            buttonText: "Congratulations!",
            disabled: true
        });

        this.props.reload();
    }

    updateBallPosition(x) {
        this.setState({
            ballPosition: x
        });
        if (x === window.innerWidth - 85) {
            this.goalComplete();
        }
        
    }

    render() {
        
        return (
            <div className="dragInteraction">
                <h1>Drag Me</h1>
                
                <DraggableCircle
                    position={this.state.ballPosition}
                    className="ball"
                    onValueChange={{ x: x => this.updateBallPosition(x) }}
                    goalComplete={this.goalComplete}
                    />
                <CircleSlot className="ballSlot" />
            </div>
            
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


export default connect(mapStateToProps)(CircleDrag);