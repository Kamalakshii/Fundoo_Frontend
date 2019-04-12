import React, { Component } from 'react';
import { Tooltip } from '@material-ui/core';
export default class dilogBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
        render()
        {
            return (
                <div>
                    <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
                </div>
            )
        }
    }