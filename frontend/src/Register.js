import React, { Component } from 'react';
require('dotenv').config()
const axios = require('axios');


class Loading extends Component {
  render() {
    return (
      <div>Hello World</div>
    );
  }
}

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    registerAccount(event) {
        event.preventDefault();

        // let username = event.target[0].value;
        // let first_name = event.target[1].value;
        // let email = event.target[2].value
        // console.log(username, first_name);
        axios({
            url: 'http://localhost:8000/api/register/',
            method: 'POST',
            data: {
                'username': event.target[0].value,
                'first_name': event.target[1].value,
                'email': event.target[2].value,
                'password': event.target[3].value
            }
        }).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        })
    }
    
    render() {
        
        return (
            <div className="registration">
                <form onSubmit={this.registerAccount}>
                    <label>Username:
                    <input type="text" name="username"></input>
                    </label>
                    <label>First Name:
                    <input type="text" name="first_name"></input>
                    </label>
                    <label>Email:
                    <input type="email" name="email"></input>
                    </label>
                    <label>Password:
                    <input type="text" name="password"></input>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}


export default Register;

