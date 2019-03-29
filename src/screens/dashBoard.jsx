import React, { Component } from 'react';
import CreateNote from '../components/createNote';
import AppbarComponent from '../components/appBar';

export default class dashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: ""
        }
    }
    render() {
        return (
            <div>
                <AppbarComponent />
                <div id="dashboard">
                <CreateNote/>
                </div>
            </div>
        )

    }
}
