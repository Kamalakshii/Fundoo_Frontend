/*****************************************************************************************************
 *  @Purpose        : to display notes in the dashbord
 *  @file           : notes.jsx       
 *  @author         : KAMALAKSHI C SWAMY
 *  @since          : 31-03-2019
 *****************************************************************************************************/
import React, { Component } from 'react';
import { Card, Chip, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import Tools from '../components/toolbar';
import { getNotes, updateColor, trashArray, setReminder, deleteNoteForever, archiveArray, saveLabel, reminderArray, pinArray, otherArray, isTrashed, updatePin, updateArchiveStatus, updateTitle, updateDescription } from '../services/noteServices';
import '../App.css';
import ArchivedNavigator from "../components/archivedNavigator";
import TrashedNavigator from "../components/trashedNavigator"
import ReminderNavigator from "../components/reminderNavigator"
import ResponsiveDialog from '../components/dilogBox'
import EditPin from "./editPin"
import PinAndOthers from '../components/notePin';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
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
export default class Cards extends Component {
    constructor() {
        super();
        this.state = {
            notes: [],
            //  open: false,
            open1: false, label: false
        }
        this.cardsToDialogBox = React.createRef();
        this.notificationDOMRef = React.createRef();
    }
    async handleClick(note) {
        console.log('note data ' + note);
        console.log("note--------------------->", note);
        this.cardsToDialogBox.current.getData(note);
        await this.setState({ open1: true })
    }
    componentDidMount() {
        getNotes()
            .then((result) => {
                this.setState({
                    notes: result.data.data
                })
                console.log("getNotes result from back-end", result);
            })
            .catch((error) => {
                alert(error)
            });
    }
    displayLabelledCards() {
        this.setState({ label: true })
    }
    getColor = (value, noteId) => {
        const color = {
            noteID: noteId,
            color: value
        }
        updateColor(color)
            .then((result) => {
                let newArray = this.state.notes;
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i]._id === noteId) {
                        newArray[i].color = result.data.data;
                        this.setState({
                            notes: newArray
                        })
                    }
                }
            })
            .catch((error) => {
                alert(error)
            });
    }
    displayNewCard = (newCard) => {
        this.setState({
            notes: [...this.state.notes, newCard]
        })
    }
    reminderNote = (value, noteId) => {
        const reminder = {
            noteID: noteId,
            reminder: value
        }
        // console.log("REMMMMMMM",reminder);
        setReminder(reminder)
            .then((result) => {
                console.log("Result is", result);
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i]._id === noteId) {
                        newArray[i].reminder = result.data.data;
                        this.setState({
                            notes: newArray
                        })
                    }
                }
            })
            .catch((error) => {
                alert(error)
            });
    }
    archiveNote = (value, noteId) => {
        const isArchived = {
            noteID: noteId,
            archive: value
        }
        //  console.log("in archive",value);
        updateArchiveStatus(isArchived)
            .then((result) => {
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i]._id === noteId) {
                        newArray[i].archive = result.data.data;
                        newArray[i].trash = false;
                        this.setState({
                            notes: newArray
                        })
                    }
                }
            })
            .catch((error) => {
                alert(error)
            });
    }
    editTitle = (noteId, value) => {
        const updatedTitle = {
            noteID: noteId,
            title: value
        }
        console.log("In updated title...>", updatedTitle);
        updateTitle(updatedTitle)
            .then((result) => {
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i]._id === noteId) {
                        newArray[i].title = result.data.data;
                        this.setState({
                            notes: newArray,
                        })
                    }
                }
            })
            .catch((error) => {
                console.log(error);
                alert(error)
            });
    }
    editDescription = (noteId, value) => {
        const updatedDescription = {
            noteID: noteId,
            description: value
        }
        console.log("In updated description...>", updatedDescription);
        updateDescription(updatedDescription)
            .then((result) => {
                console.log("oooooooooooooo", result);
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i]._id === noteId) {
                        newArray[i].description = result.data.data;
                        this.setState({
                            notes: newArray
                        })
                    }
                }
            })
            .catch((error) => {
                console.log(error)
                alert(error);
            });
    }
    trashNote = (noteId) => {
        const trash = {
            noteID: noteId
        }
        console.log("In Trash note->", trash);
        isTrashed(trash)
            .then((result) => {
                //     console.log("ressssssssss----------",trash);
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i]._id === noteId) {
                        newArray[i].trash = result.data.data;
                        newArray[i].pinned = false;
                        newArray[i].archive = false
                        this.setState({
                            notes: newArray,
                        })
                    }
                }
            })
            .catch((error) => {
                console.log(error);
                alert(error)
            });
    }
    deleteNote = (noteId) => {
        const obj = {
            noteID: noteId,
        }
        console.log("data in deleteeeeeeeeeeeee", obj);
        deleteNoteForever(obj)
            .then((result) => {
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i]._id === obj.noteID) {
                        newArray.splice(i, 1);
                        this.setState({
                            notes: newArray
                        })
                    }
                }
            })
            .catch((error) => {
                // NotificationManager.error(error);
                alert(error)
            });
    }
    pinNote = (value, noteId) => {
        const isPinned = {
            noteID: noteId,
            pinned: value
        }
        updatePin(isPinned)
            .then((result) => {
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i]._id === noteId) {
                        newArray[i].archive = false;
                        newArray[i].trash = false;
                        newArray[i].pinned = result.data.data;
                        this.setState({
                            notes: newArray
                        })
                    }
                }

            })
            .catch((error) => {
                // NotificationManager.error(error);
                alert(error)
            });
    }
    handleClose = (evt) => {
        this.setState({ open1: false })
    }
    addNotification = (title, msg, type) => {
        this.notificationDOMRef.current.addNotification({
            title: title,
            message: msg,
            type: type,
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: { duration: 2000 },
            dismissable: { click: true }
        });
    }
    addLabelToNote = (noteId, value) => {
        const addLabel = {
            noteID: noteId,
            label: value
        }
        saveLabel('/saveLabelToNote', addLabel)
            .then((result) => {
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i]._id === noteId) {
                        newArray[i].label = result.data.data;
                        this.setState({
                            notes: newArray
                        })
                    }
                }
            })
            .catch((error) => {
                console.log(error);
                // alert(error)
            });
    }
    deleteLabelFromNote = (value, noteId) => {
        const deleteLabel = {
            pull: true,
            label: value,
            noteID: noteId
        }
        saveLabel('/saveLabelToNote', deleteLabel)
            .then((result) => {
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i]._id === noteId) {
                        newArray[i].label = result.data.data;
                        this.setState({
                            notes: newArray
                        })
                    }
                }
            })
            .catch((error) => {
                console.log(error);
                // alert(error)
            });
    }
    render() {
        let notesArray = otherArray(this.state.notes);
        if (this.props.navigateArchived) {
            return (
                <div>
                    <ReactNotification ref={this.notificationDOMRef} />
                    <ArchivedNavigator
                        archiveArray={archiveArray(this.state.notes)}
                        othersArray={otherArray}
                        getColor={this.getColor}
                        noteProps={this.props.noteProps}
                        archiveNote={this.archiveNote}
                        trashNote={this.trashNote}
                        pinNote={this.pinNote}
                        editTitle={this.editTitle}
                        reminderNote={this.reminderNote}
                        editDescription={this.editDescription}
                        showAlertMessage={this.addNotification}
                        addLabelToNote={this.addLabelToNote}
                        deleteLabelFromNote={this.deleteLabelFromNote}
                    />
                </div>
            )
        }
        else if (this.props.navigateTrashed) {
            return (
                <div>
                    <ReactNotification ref={this.notificationDOMRef} />
                    <TrashedNavigator
                        trashArray={trashArray(this.state.notes)}
                        othersArray={otherArray}
                        getColor={this.getColor}
                        noteProps={this.props.noteProps}
                        trashNote={this.trashNote}
                        pinNote={this.pinNote}
                        deleteNote={this.deleteNote}
                        reminderNote={this.reminderNote}
                        showAlertMessage={this.addNotification}
                    />
                </div>
            )
        }
        else if (this.props.navigateReminder) {
            return (
                <div>
                    <ReactNotification ref={this.notificationDOMRef} />
                    <ReminderNavigator
                        reminderArray={reminderArray(this.state.notes)}
                        othersArray={otherArray}
                        getColor={this.getColor}
                        noteProps={this.props.noteProps}
                        reminderNote={this.reminderNote}
                        trashNote={this.trashNote}
                        pinNote={this.pinNote}
                        editTitle={this.editTitle}
                        editDescription={this.editDescription}
                        showAlertMessage={this.addNotification}
                        addLabelToNote={this.addLabelToNote}
                        deleteLabelFromNote={this.deleteLabelFromNote}
                    />
                </div>
            )
        }
        let cardsView = this.props.noteProps ? "listCards" : "cards";
        return (
            <div className="root">
                <ReactNotification ref={this.notificationDOMRef} />
                <MuiThemeProvider theme={theme}>
                    <div className="CardsView" >
                        {
                            Object.keys(notesArray).slice(0).reverse().map((key) => {
                                return (
                                    <div id="gap" key={key}>
                                        <Card className={cardsView} style={{ backgroundColor: notesArray[key].color, borderRadius: "15px", padding: "3%", border: "1px solid #dadce0" }}>
                                            <div>
                                                <div onClick={() => this.handleClick(notesArray[key])} style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <b> {notesArray[key].title}</b>
                                                </div>
                                                <div>
                                                    <EditPin
                                                        cardPropsToPin={this.pinNote}
                                                        noteID={notesArray[key]._id}
                                                        pinStatus={notesArray[key].pinned}
                                                    />
                                                </div>

                                                <div onClick={() => this.handleClick(notesArray[key])} style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                                                    {notesArray[key].description}
                                                </div >

                                            </div>
                                            <div id="dispNote">
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        wordBreak: "break-word"
                                                    }}
                                                ></div>
                                            </div>

                                            <div>

                                                {notesArray[key].reminder ?
                                                    <Chip
                                                        label={notesArray[key].reminder}
                                                        onDelete={() => this.reminderNote('', notesArray[key]._id)}
                                                    />
                                                    :
                                                    null
                                                }
                                                {notesArray[key].label.length > 0 ?
                                                    notesArray[key].label.map((key1, index) =>
                                                        <div key={index}>
                                                            <Chip
                                                                label={key1}
                                                                onDelete={() => this.deleteLabelFromNote(key1, notesArray[key]._id)}
                                                            />
                                                        </div>
                                                    )
                                                    :
                                                    null
                                                }
                                            </div>
                                            <div id="displaycontentdiv">
                                                <Tools
                                                    createNotePropsToTools={this.getColor}
                                                    noteID={notesArray[key]._id}
                                                    reminder={this.reminderNote}
                                                    archiveNote={this.archiveNote}
                                                    archiveStatus={notesArray[key].archive}
                                                    trashNote={this.trashNote}
                                                    trashStatus={notesArray[key].trash}
                                                    pinArray={pinArray(this.state.notes)}
                                                    pinNote={this.pinNote}
                                                    showAlertMessage={this.addNotification}
                                                    addLabelToNote={this.addLabelToNote}
                                                    deleteLabelFromNote={this.deleteLabelFromNote}
                                                />
                                            </div>
                                        </Card>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <ResponsiveDialog
                        close={this.handleClose}
                        ref={this.cardsToDialogBox}
                        parentProps={this.state.open1}
                        archiveNote={this.archiveNote}
                        trashNote={this.trashNote}
                        reminder={this.reminderNote}
                        createNotePropsToTools={this.getColor}
                        editTitle={this.editTitle}
                        editDescription={this.editDescription}
                        showAlertMessage={this.addNotification}
                        addLabelToNote={this.addLabelToNote}
                        deleteLabelFromNote={this.deleteLabelFromNote}
                    ></ResponsiveDialog>
                </MuiThemeProvider>
            </div>
        );
    }
}


