import React, { Component } from 'react';
import './Register.css';
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
                <form className="simform" onSubmit={this.registerAccount}>
                    <div className="form-inner">
                        <ol className="questions">
                            <li>
                                
                                <label>Username:
                                <input type="text" name="username"></input>
                                </label>
                            </li>
                            <li>
                                <label>First Name:
                                <input type="text" name="first_name"></input>
                                </label>
                            </li>
                            <li>
                                <label>Email:
                                <input type="email" name="email"></input>
                                </label>
                            </li>
                            <li>
                                <label>Password:
                                <input type="text" name="password"></input>
                                </label>
                            </li>
                        </ol>
                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        )
    }
}


export default Register;

