import React, {Component} from "react";
import { Dialog, TextField, Button, createMuiTheme, MuiThemeProvider, Divider, Tooltip } from '@material-ui/core';
import { addLabel, deleteLabel, updateLabel } from '../services/noteServices';
import SnackBar from './snackbar';
import { NotificationManager } from 'react-notifications';
export default class EditLabel extends Component{
    constructor(props){
        super(props);
        this.state={
            label:"",
            label_id:"",
            editLabel:""
        }
        
    }
    addLabel(value){
        const label={
            label:value
        }
    }
}
