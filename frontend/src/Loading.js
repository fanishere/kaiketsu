import React, { Component } from 'react';
require('dotenv').config({ path: '.env.development'});
let API_URL = process.env.API_URL;

class Loading extends Component {
  render() {
    return (
      <div>Hello World</div>
    );
  }
}

class Register extends Component {
    render() {
        return (
            <div>Login</div>
        )
    }
}



export default Loading;

