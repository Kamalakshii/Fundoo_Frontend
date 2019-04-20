import React, { Component } from 'react';
import { Card, Chip, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import Tools from '../components/toolbar';
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
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <b>{key.title}</b>
                                       
                                    </div>
                                    <div style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                                        {key.description}
                                    </div >
                                    {key.reminder ?
                                        <Chip
                                            label={key.reminder}
                                            onDelete={() => this.props.reminder("", key._id)} />
                                        :
                                        null}
                                   
                                </div>
                                <div id="displaycontentdiv">
                                    <Tools
                                        createNotePropsToTools={this.props.getColor}
                                        note={key}
                                        noteID={key._id}
                                        reminder={this.props.reminder}
                                        trashNote={this.props.trashNote}
                                        archiveStatus={key.archive}
                                        archiveNote={this.props.archiveNote}
                                        uploadImage={this.props.uploadImage}
                                        deleteLabelFromNote={this.props.deleteLabelFromNote}
                                        addLabelToNote={this.props.addLabelToNote}
                                    />
                                </div>
                            </Card>
                        )
                    })
                    }
                </div>
            </MuiThemeProvider>
        )
    }
}

