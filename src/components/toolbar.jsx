/****************************************************************************************
 *  @Purpose        : to create the tools that required in creating a note.
 *  @file           : toolbar.jsx       
 *  @author         : KAMALAKSHI C SWAMY 
 *  @since          : 30-03-2019
 *****************************************************************************************/
import React, { Component } from 'react';
import Reminder from '../components/reminder';
import ColorBox from '../components/colorBox';
import Archive from '../components/archive';
import MoreOptions from './moreOptions';
export default class Tools extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
        this.handleToggle = this.handleToggle.bind(this);
    }
    /**
     * @description:it will toggle color event
     */
    handleToggle() {
        try {
            this.setState({ open: !this.state.open });
        } catch (err) {
            console.log("error at handleToggle in tools");
        }
    }
    render() {
        const setNoteTime = parseInt(new Date().getHours()) >= 10 ? "PM" : "AM";
        return (
            <div>               
                <div className="cardTools">      
                <Reminder
                        handleToggle={this.handleToggle}
                        parentToolsProps={setNoteTime}
                        reminder={this.props.reminder}
                        noteID={this.props.noteID}
                        showAlertMessage={this.props.showAlertMessage}
                    />
                    <ColorBox 
                        handleToggle={this.handleToggle}
                        toolsPropsToColorpallete={this.props.createNotePropsToTools}
                        noteID={this.props.noteID}
                    />
                      <Archive
                        archiveNote={this.props.archiveNote}
                        noteID={this.props.noteID}
                        archiveStatus={this.props.archiveStatus}
                        showAlertMessage={this.props.showAlertMessage}                    
                    />
                         <MoreOptions
                        handleToggle={this.handleToggle}
                        trashNote={this.props.trashNote}
                        noteID={this.props.noteID}
                        trashStatus={this.props.trashStatus}
                        addLabelToNote={this.props.addLabelToNote}
                    />
                </div>
            </div>
        )
    }
}