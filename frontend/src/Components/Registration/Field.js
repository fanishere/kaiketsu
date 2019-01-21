import React, { Component } from 'react';


class Field extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: ['username', 'first_name', 'email', 'password']
        }
    }

    render() {
        return (
            <p>
                <label>{this.props.label}</label>
                <input
                    type={this.props.type}
                    name={this.props.field}
                    htmlFor={this.props.field}
                    placeholder={this.props.placeholder}
                    ></input>
            </p>
            
        )
    }
}

export default Field;