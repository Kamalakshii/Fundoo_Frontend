import React, { Component } from 'react';
import { Card, Chip, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import Tools from '../components/toolbar';
import ResponsiveDialog from '../components/dilogBox'
const theme = createMuiTheme({
    overrides: {
        MuiChip: {
            root: {
                fontSize: 14,
                marginTop: 20,
                height: 25,
                backgroundColor: "rgba(0, 0, 0, 0.10)",
                padding: 0
            },
            deleteIcon: {
                width: 20,
                height: 20
            }
        },
    },
    typography: {
        useNextVariants: true,
    },
})
export default class ReminderNavigator extends Component {
    constructor() {
        super();
        this.state = {
            notes: [],
              open: false,
            open1: false
        }
        this.cardsToDialogBox = React.createRef();
    }
    async handleClick(note) {
        console.log('note data ' + note);
        console.log("note--------------------->", note);
        this.cardsToDialogBox.current.getData(note);
        await this.setState({ open1: true })
    }
    handleClose = (evt) => {
        this.setState({ open1: false })
    }  
    render() {
        let cardsView = this.props.noteProps ? "listCards" : "cards";
        return (
            <MuiThemeProvider theme={theme}>
                <label style={{ fontFamily: "georgia", fontSize: "18px", color: "grey", marginRight: "760px" }}>REMINDERS</label>
                <div className="CardsView" >
                    {this.props.reminderArray.map((key) => {
                        return (
                            <Card className={cardsView} style={{ backgroundColor: key.color, borderRadius: "15px", border: "1px solid #dadce0", wordBreak: "break-word" }} >
                                <div className="DispCont" >   
                                    <div onClick={()=>this.handleClick(key)} style={{ display: "flex", justifyContent: "space-between" }}>
                                        <b>{key.title}</b>                                       
                                    </div>                              
                                    <div onClick={()=>this.handleClick(key)} style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                                        {key.description}
                                    </div >                     
                                    {key.reminder ?
                                        <Chip
                                            label={key.reminder}
                                            onDelete={() => this.props.reminderNote("", key._id)} />
                                        :
                                        null}                                                                         
                                </div>                                
                                <div id="displaycontentdiv">
                                    <Tools
                                        createNotePropsToTools={this.props.getColor}
                                        note={key}
                                        noteID={key._id}
                                        reminder={this.props.reminderNote}
                                        trashNote={this.props.trashNote}
                                        archiveStatus={key.archive}
                                        archiveNote={this.props.archiveNote}                                                                               
                                    />
                                </div>
                            </Card>
                        )
                    })              
                    }
                </div>
                <ResponsiveDialog
                        close={this.handleClose}
                        ref={this.cardsToDialogBox}
                        parentProps={this.state.open1}
                        // note={notesArray[key].note}
                        archiveNote={this.props.archiveNote}
                        reminder={this.props.reminderNote}
                        // noteID={notesArray[key]._id}
                        // archiveStatus={notesArray[key].archive}
                        createNotePropsToTools={this.getColor}
                        editTitle={this.props.editTitle}
                        editDescription={this.props.editDescription}
                    ></ResponsiveDialog>
            </MuiThemeProvider>
        )
}
}
