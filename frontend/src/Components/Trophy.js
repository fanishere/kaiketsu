import React, { Component } from 'react';
import { connect } from "react-redux";
import {secondsToDays} from './utility';
import './Trophy.css';
import personal_logo from './media/Final/balloon-final-100.png';
import health_logo from './media/Final/caktus-final-100.png';
import prof_logo from './media/Final/mountain-final-100.png';
import balloon from './media/Final/balloon-sketch-final.png';
const axios = require('axios');


/*
    TrophyItem is the display for a trophied goal.
    On render, it selects a random phrase from it's state.
*/
class TrophyItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phrases: [
                'Your ambition and dedication are very impressive.',
                'Your perseverance will allow you to accomplish so many things.',
                'Nothing is impossible for the willing.',
                'Success lies in the hands of those who work for it.',
                'Your diligence is what will set you apart.',
                'There is endless potential within you.',
                'Your ability to conquer your challenges is limitless.',
                'You are unstoppable.'

            ]
        }
    }

    getRandomPhrase() {
        let phraseNumber = Math.floor(Math.random() * (this.state.phrases.length));
        return this.state.phrases[phraseNumber];
    }

    render() {
        return (
            <div className="TrophyItem">
                <div className="trophyImage">
                    {this.props.category === 'HEALTH'
                        ? <img src={health_logo} alt="health logo"></img>
                        : this.props.category === 'PERSONAL'
                            ? <img src={personal_logo} alt="personal logo"></img>
                            : <img src={prof_logo} alt="professional logo"></img>
                    }
                   
                </div>
                <div className="trophyData">
                    <p>Congratulations! You have achieved your goal to &nbsp;
                    {this.props.resolution.toLowerCase()} for {secondsToDays(this.props.duration)} days.</p>
                    <p className="trophyPhrase">{this.getRandomPhrase()}</p>
                </div>
            </div>
        );
    }
}


/*
    Trophy sends a get request to the API to get all trophied goals
    and their data. It sends this data as props to TrophyItem components.
*/
class Trophy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }

    componentDidMount() {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": `Token ${this.props.token}`
        };
        return axios({
            url: `${process.env.REACT_APP_API_URL}/api/trophy-goals/`,
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

    render() {
        let trophyItems = [];
        if (this.state.data) {
            let goals = this.state.data;
            for (let i = 0; i < goals.length; i++) {
                trophyItems.push(
                    <TrophyItem
                        resolution={goals[i].resolution}
                        reason={goals[i].reason}
                        duration={goals[i].duration}
                        category={goals[i].category}
                        key={i}
                    >
                    </TrophyItem>
                );
            }

        }
        if (this.state.data) {
            return (
                <div className="Trophy">
                    {trophyItems.length > 0
                        ? trophyItems
                        : <div className="noTrophiesYet">
                            <h1>You're almost there! Just keep at it!</h1>
                            <img src={balloon} alt="balloon"></img>
                            <img src={balloon} alt="balloon"></img>
                        </div>}
                </div>
            );
        } else {
            return (
                <div className="Trophy">
                </div>
            );
        }
        
    }
}


const mapStateToProps = state => {
    let errors = [];
    if (state.auth.errors) {
        errors = Object.keys(state.auth.errors).map(field => {
            return { field, message: state.auth.errors[field] };
        });
    }
    return {
        errors,
        isAuthenticated: state.auth.isAuthenticated,
        token: localStorage.getItem("token"),
    };

}


export default connect(mapStateToProps)(Trophy);
