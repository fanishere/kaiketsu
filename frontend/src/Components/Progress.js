import React, {Component} from 'react';
import { VictoryBar, VictoryChart, VictoryLegend, VictoryLabel, VictoryStack } from 'victory';
import {connect} from "react-redux";
import HeatMap from './HeatMap';
import './GoalDetail.css';
import {
    Redirect,
    Link
} from "react-router-dom";
const axios = require('axios');


class DashboardProgressDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }
     render() {
         return (
            <div className="goalCompletion">
                <div className="goalCompletionLegend">
                    <VictoryChart polar
                        domain={{ x: [0, 360] }}
                        height={400} width={400}
                    >
                    <VictoryBar
                        style={{ data: { fill: "#c43a31", width: 50 }}}

                    />
                    </VictoryChart>
                </div>
                <HeatMap></HeatMap>
      
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


export default connect(mapStateToProps)(DashboardProgressDisplay);