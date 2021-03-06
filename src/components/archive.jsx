/*****************************************************************************************************
 *  @Purpose        : to archive the created notes
 *  @file           : archive.jsx       
 *  @author         : KAMALAKSHI C SWAMY
 *  @since          : 20-03-2019
 *****************************************************************************************************/
import React, { Component } from 'react';
import Archiveicon from '../assets/archive.svg';
import { Tooltip } from '@material-ui/core';
export default class Archive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            isArchived: false,
            snackBarMessage: "",
            openSnackBar: false,
        }
    }
    handleArchive = () => {
        console.log("(this.props.archiveStatus", this.state.isArchived);     
        if (this.props.archiveStatus === false) {
           // this.state.isArchived = true;
         this.setState({ isArchived: true });
          this.props.showAlertMessage("status","note archived","success");
            // console.log("this.state.isArchived changed", this.state.isArchived);
            this.props.archiveNote(this.state.isArchived, this.props.noteID)
        }
        else {
            //  this.state.isArchived = false;
            this.setState({ isArchived: false });
            //this.props.showAlertMessage("status","note unarchived","success");
            console.log(" this.state.isArchived change else", this.state.isArchived);
            this.props.archiveNote(this.state.isArchived, this.props.noteID)
        }
    }
    render() {
        const { open } = this.state.open;
        return (
            this.state.isArchived ?
                <div>
                    <div id="archiveIcon">
                        <Tooltip title="Archive Note" onClick={
                            this.handleArchive
                        }>
                            <img src={Archiveicon}
                                alt="archive note icon"
                            />
                        </Tooltip>
                    </div>
                </div>                
                :
                <div id="archiveIcon">
                    <Tooltip title="Archive Note" onClick={
                        this.handleArchive
                    }>
                        <img src={Archiveicon}
                            alt="archive note icon"
                        />
                    </Tooltip>
                </div>           
        )
    }
}
