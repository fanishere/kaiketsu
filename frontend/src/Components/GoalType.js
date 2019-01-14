import React, { Component } from 'react';
import {
    Redirect,
    Link
} from "react-router-dom";
import './GoalType.css';
import professional from './media/goal_card_1.png';
import health from './media/goal_card_2.png';
import personal from './media/goal_card_3.png';


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
            <div>
                <Link to="/dashboard/create-goal/HEALTH">
                    <div className="goal-type-selection">
                        <img src={health} alt="health"></img>
                    </div>
                </Link>

                <Link to="/dashboard/create-goal/PERSONAL">
                    <div className="goal-type-selection">
                        <img src={personal} alt="personal"></img>
                    </div>
                </Link>

                <Link to="/dashboard/create-goal/PROFESSIONAL">
                    <div className="goal-type-selection">
                        <img src={professional} alt="professional"></img>
                    </div>
                </Link>

            </div>
        )
    }
}


export default GoalType;