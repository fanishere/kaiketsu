import React, { Component } from 'react';
import {connect} from "react-redux";
import './Trophy.css';
import personal_logo from './media/Monday/Balloon_logo.png';
import health_logo from './media/Monday/Cactus_logo.png';
import prof_logo from './media/Monday/Geo_logo.png';
const axios = require('axios');


class TrophyItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phrases: [
                'sdfsdf',
                'mpopojrgpoejr',
                'sdfsdf'
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
                    <img src={personal_logo} alt="personal logo"></img>
                </div>
                <div className="trophyData">
                    <p>Congratulations! In your journey to &nbsp;
                    {this.props.resolution.toLowerCase()} for {secondsToDays(this.props.duration)} days.</p>
                    <p>{this.getRandomPhrase()}</p>
                </div>
            </div>
        );
    }
}

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
        return (
            <div className="Trophy">
                {trophyItems}
            </div>
        );
    }
}
function secondsToDays(num) {
    return num / 86400;
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
