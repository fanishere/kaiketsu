import React, { Component } from 'react';
import {connect} from "react-redux";
const axios = require('axios');


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
                    goals: res.data
                })
                return res.data;

            } else if (res.status >= 400 && res.status < 500) {
                throw res.data;
            }

        });
    }

    render() {
        return (
            <div className="Trophy">

            </div>
        );
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
