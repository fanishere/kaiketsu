import React, { Component } from 'react';
import './Interactions.css';
import {connect} from "react-redux";
import posed from 'react-pose';
import health_logo from '../media/Final/health-sketch-final.png';
import personal_logo from '../media/Final/balloon-sketch-final.png';
import professional_logo from '../media/Final/mountain-no-lines-final.png';
const axios = require('axios');


const SuccessCircle = posed.div({
    hoverable: true,
    hover : {
      scale: 1.2,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 0,
        duration: 2000
      }
    }
});


/*
    GoalCompletion is a circle that starts animating on hover,
    and cycles through messages to the user on click.
*/
class GoalCompletion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            currentPhrase: 0,
            visible: true
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
        
        let intervalID = setInterval(() => {
            this.setState({
                currentPhrase: this.state.currentPhrase + 1
            });
            if (this.state.currentPhrase > 5) {
                this.setState({
                    visible: false
                });
                clearInterval(intervalID);
            }
        }, 2000);
       
      }

    render() {
        let phrases;
        if (this.state.data) {
            phrases = [
                'Success!',
                "Your resolve is impressive.",
                "You've achieved your goal!",
                `${this.state.data.days.length} Days!`,
                "Your goal has been moved to your trophies!"
            ]
        }

        return (
            <div className="goalSuccess">
                <SuccessCircle
                    className={`SuccessCircle ${this.state.visible
                                                    ? ''
                                                    : 'invisible'}`} onClick={this.setPhrases.bind(this)}>
                    <h1 >
                        {phrases 
                            ? phrases[this.state.currentPhrase]
                            : ''}
                        
                    </h1>
                </SuccessCircle>

                <div className="landscape">
                    <img src={health_logo} alt="health"></img>
                    <img src={personal_logo} alt="personal"></img>
                    <img src={professional_logo} alt="professional"></img>
                </div>
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