import React, { Component } from 'react';
import {
    Link
} from "react-router-dom";
import './GoalType.css';
import personal_logo from './media/icon-white-3_720.png';
import health_logo from './media/icon-white-1_720.png';
import prof_logo from './media/icon-white-2.png';


class GoalType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            toDashboard: false,
        }
    }


    render() {

        return (
            <div className="GoalType">
                
                <Link to="/dashboard/create-goal/HEALTH/">
                    <div className="goal-type-selection health">
                       <img src={health_logo} alt="health"></img>
                       <h2>Health + Wellness</h2>
                    </div>
                </Link>

                <Link to="/dashboard/create-goal/PERSONAL/">
                    <div className="goal-type-selection personal">
                    <img src={personal_logo} alt="personal"></img>
                    <h2>Personal</h2>
                    </div>
                </Link>

                <Link to="/dashboard/create-goal/PROFESSIONAL/">
                    <div className="goal-type-selection professional">
                    <img src={prof_logo} alt="professional"></img>
                    <h2>Professional</h2>
                    </div>
                </Link>

            </div>
        )
    }
}


export default GoalType;