import React, { Component } from 'react';
require('dotenv').config()



class Loading extends Component {
  render() {
    return (
      <div>Hello World</div>
    );
  }
}

class Register extends Component {

    // registerAccount(e) {
    //     axios({
    //         url: 
    //     })
    // }
    
    render() {
        
        return (
            <div className="registration">
                <form onSubmit = {this.registerAccount}>
                    <label>Username</label>
                    <input type="text" name="username"></input>
                    
                </form>
            </div>
        )
    }
}


export default Register;

