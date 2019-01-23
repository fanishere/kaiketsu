import React, { Component } from 'react';
import './Interactions.css';
import SplitText from 'react-pose-text';
import {connect} from "react-redux";
import posed from 'react-pose';
const axios = require('axios');

const charPoses = {
    exit: { opacity: 0 },
    enter: { opacity: 1 }
};


const SuccessCircle = posed.div({
    hoverable: true,
    hover : {
      scale: 1.2,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 0
      }
    }
})

class GoalCompletion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            currentPhrase: 0
        }
    }

    componentDidMount() {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": `Token ${this.props.token}`
        };
        return axios({
            url: `${process.env.REACT_APP_API_URL}/api/goals/${this.props.match.params.id}/`,
                method: 'GET',
                headers: headers
            }).then(res => {
            if (res.status === 200) {
                console.log(res);
                this.setState({
                    data: res.data
                })
                return res.data;
    
            } else if (res.status >= 400 && res.status < 500) {
                throw res.data;
            }
    
            });
    }

    setPhrases() {
        
        setInterval(() => {
            this.setState({
                currentPhrase: this.state.currentPhrase + 1
            })
        }, 2000);
      }

    render() {
        let phrases;
        if (this.state.data) {
            phrases = [
                'Success!',
                "Your resolve is impressive.",
                "You've achieved your goal!",
                `${this.state.data.days.length} Days!`
            ]
        }

        return (
            <div className="goalSuccess">
                <SuccessCircle className="SuccessCircle" onClick={this.setPhrases.bind(this)}>
                    <h1 >
                        {phrases 
                            ? phrases[this.state.currentPhrase]
                            : ''}
                        
                    </h1>
                </SuccessCircle>
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


export default connect(mapStateToProps)(GoalCompletion);