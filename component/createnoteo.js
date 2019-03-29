import React, { Component } from 'react';
import { Input, Card, createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import Tools from './tools';
import { Button } from '@material-ui/core';
import { createNote } from '../services/noteServices';
import EditPin from '../components/editPin';
import UploadImage from './uploadImage';
const theme = createMuiTheme({
    overrides: {
        MuiPaper: {
            rounded: {
                borderRadius: "15px",
            },
            elevation1: {
                boxShadow: "0 3px 5px rgba(0,0,0,0.20)"
            }
        },
    },
    typography: {
        useNextVariants: true,
    },
})
export default class createNotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openNote: false,
            title: "",
            description: "",
            reminder: "",
            color: "rgb(255, 255, 255)",
            pinned: false,
            image: "",
            archive: false,
            trash: false,
            newNote: {}
        }
        this.handleTitle = this.handleTitle.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleColor = this.handleColor.bind(this);
        this.handleArchive = this.handleArchive.bind(this);
        this.handleReminder = this.handleReminder.bind(this);
        this.handlePinned = this.handlePinned.bind(this);
    }
    /**
     * @description:it will handle the title event
     * @param {*event for title} evt 
     */
    handleTitle(evt) {
        try {
            this.setState({ title: evt.target.value })
        } catch (err) {
            console.log("error at handleTitle in createNotes");
        }
    }
    /**
     * @description:it will handle the description event
     * @param {*event for description} evt 
     */
    handleDescription(evt) {
        try {
            this.setState({ description: evt.target.value })
        } catch (err) {
            console.log("error at handleDescription in createNotes");
        }
    }
    /**
     * @description:it will handle the reminder event
     * @param {*value for reminder} value 
     */
    handleReminder(value) {
        try {
            this.setState({ reminder: value })
        } catch (err) {
            console.log("error at handleReminder in createNotes");
        }
    }
    /**
     * @description:it will handle the color event
     * @param {*value for color} value 
     */
    handleColor(value) {
        try {
            this.setState({ color: value });
        } catch (err) {
            console.log("error at handleColor in createNotes");
        }
    }
    /**
     * @description:it will handle the archive event
     * @param {*value for archive} value 
     */
    handleArchive(value) {
        try {
            this.setState({ archive: value });
        } catch (err) {
            console.log("error at handleArchive in createNotes");
        }
    }
    /**
     * @description:it will handle the pinned event
     * @param {*value for pinned} value 
     */
    handlePinned(value) {
        try {
            this.setState({ pinned: value });
        } catch (err) {
            console.log("error at handlePinned in createNotes");
        }
    }
    /**
     * @description:it will handle the creating a new note
     */
    handleToggle() {
        try {
            this.setState({ openNote: !this.state.openNote });
            // console.log("pinned", this.state.openNote);
            if (this.state.title !== '' || this.state.description !== '' || this.state.color !== "rgb(255, 255, 255)") {
                const note = {
                    userId: localStorage.getItem('userId'),
                    title: this.state.title,
                    description: this.state.description,
                    reminder: this.state.reminder,
                    color: this.state.color,
                    image: this.state.image,
                    archive: this.state.archive,
                    pinned: this.state.pinned,
                    trash: this.state.trash,
                }
                createNote(note)
                    .then((result) => {
                        console.log("create note result from back-end====>", result.data.data);
                        this.setState({
                            newNote: result.data.data.note
                        })
                        this.props.getNewNote(this.state.newNote)
                    })
                    .catch((error) => {
                        alert(error);
                    })
                this.setState({
                    title: "",
                    description: "",
                    reminder: "",
                    color: "rgb(255, 255, 255)",
                    image: "",
                    archive: false,
                    pinned: false,
                    trash: false
                })
            }
        } catch (err) {
            console.log("error at handleToggle in createNotes");
        }
    }
    render() {
        return (!this.state.openNote ?
            <MuiThemeProvider theme={theme}>
                <div id="createNoteParent">
                    <Card className="createNote">
                        <div className="staticCreateNote">
                            <Input
                                className="noteInputBase1"
                                multiline
                                disableUnderline={true}
                                placeholder="Take a note ..."
                                id="description"
                                readOnly={true}
                                onClick={this.handleToggle}
                                value=""
                            />
                            <UploadImage />
                        </div>
                    </Card>
                </div>
            </MuiThemeProvider>
            :
            <MuiThemeProvider theme={theme}>
                <div id="createNoteParent">
                    <Card className="createNote1" style={{ backgroundColor: this.state.color }}>
                        <div className="createNotePinIcon">
                            <Input
                                className="noteInputBase"
                                multiline
                                disableUnderline={true}
                                id="title"
                                placeholder="Title"
                                value={this.state.title}
                                onChange={this.handleTitle}
                            />
                            <div>
                                <EditPin
                                    pinStatus={this.state.pinned}
                                    cardPropsToPin={this.handlePinned}
                                />
                            </div>
                        </div>
                        <Input
                            className="noteInputBase"
                            multiline
                            disableUnderline={true}
                            placeholder="Take a note..."
                            id="description"
                            value={this.state.description}
                            onChange={this.handleDescription}
                        />
                        <div className="cardToolsClose" >
                            <Tools
                                reminder={this.handleReminder}
                                createNotePropsToTools={this.handleColor}
                                archiveNote={this.handleArchive}
                                archiveStatus={this.state.archive}
                            />
                            <Button onClick={this.handleToggle}>Close</Button>
                        </div>
                    </Card>
                </div>
            </MuiThemeProvider>
        )
    }
}
