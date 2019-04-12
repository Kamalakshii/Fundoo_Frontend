/********************************************************************************
 *  @Purpose        : to export the button component
 *  @file           : button.jsx        
 *  @author         : KAMALAKSHI C SWAMY
 *  @since          : 15-03-2019
 *********************************************************************************/
import React, { Component } from 'react';
import "../App.css";
import Button from '@material-ui/core/Button';
export default class Button extends Component {
    render() {
        return (
            <div className = "button">
            <button id="Login">Login</button>
            </div>
        );
    }
}

