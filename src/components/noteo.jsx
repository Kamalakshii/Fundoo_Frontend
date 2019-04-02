
import React, { Component } from 'react';
import { Card, Chip, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import Tools from '../components/tools';
import ArchivedNavigator from "../components/archivedNavigator";
import ReminderNavigator from "../components/reminderNavigator";
import TrashNavigator from '../components/trashedNavigator';
import { getNotes, updateColor, deleteNoteForever, updateArchiveStatus, setReminder, isTrashed, updateDescription, updateTitle, updatePin, updateImages } from '../services/noteServices';
import { otherArray, archiveArray, remiderArray, trashArray, pinArray } from '../services/noteServices';
import DialogBox from '../components/dialogBox';
import EditPin from '../components/editPin';
import PinAndOthers from '../components/notePin';
import SearchedNotes from '../components/searchNote';
import '../App.css';
// import clockIcon from '../assets/images/clockIcon.svg';
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
            open: false,
            open1: false,
            notes: [],
            label: false
        }
        this.cardsToDialogBox = React.createRef();
    }
    handleClick = (note) => {
        this.setState({ open1: true })
        this.cardsToDialogBox.current.getData(note);
    }
    closeEditBox = (e) => {
        this.setState({ open1: false })
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
    archiveNote = (value, noteId) => {
        const isArchived = {
            noteID: noteId,
            archive: value
        }
        updateArchiveStatus(isArchived)
            .then((result) => {
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i]._id === noteId) {
                        newArray[i].archive = result.data.data;
                        newArray[i].pinned = false;
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
    reminderNote = (value, noteId) => {
        const reminder = {
            noteID: noteId,
            reminder: value
        }
        setReminder(reminder)
            .then((result) => {
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
    editTitle = (value, noteId) => {
        const title = {
            noteID: noteId,
            title: value
        }
        console.log("title-->", title);

        updateTitle(title)
            .then((result) => {
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i]._id === noteId) {
                        newArray[i].title = result.data.data;
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
    editDescription = (value, noteId) => {
        const description = {
            noteID: noteId,
            description: value
        }
        updateDescription(description)
            .then((result) => {
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
                alert(error)
            });
    }
    trashNote = (noteId) => {
        const trash = {
            noteID: noteId
        }
        isTrashed(trash)
            .then((result) => {
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
                alert(error)
            });
    }
    uploadImage = (value, noteId) => {
        console.log("image:------------", value);
        let data = new FormData();
        data.append('image', value);
        data.append('noteID', noteId);
        console.log("request", data);
        updateImages(data)
            .then((result) => {
                console.log("result", result.data.data)
                let newArray = this.state.notes
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i]._id === noteId) {
                        newArray[i].image = result.data.data;
                        this.setState({
                            notes: newArray
                        })
                    }
                }
            })
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
                alert(error)
            });
    }
    deleteNote = (noteId) => {
        const obj = {
            noteID: noteId,
        }
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
                alert(error)
            });
    }
    displayNewCard = (newCard) => {
        this.setState({
            notes: [...this.state.notes, newCard]
        })
    }
    render() {
        let notesArray = otherArray(this.state.notes);

        if ((this.props.searchNote !== "") && (!this.props.navigateArchived
            && !this.props.navigateReminder && !this.props.navigateTrashed)) {
            let searchNote;
            if (this.props.searchNote !== "") {
                searchNote = this.state.notes.filter(
                    obj => obj.title.includes(this.props.searchNote) ||
                        obj.description.includes(this.props.searchNote)
                )
            }
            return (
                <SearchedNotes
                    searchNote={searchNote}
                    getColor={this.getColor}
                    noteProps={this.props.noteProps}
                    reminder={this.reminderNote}
                    trashNote={this.trashNote}
                    archiveNote={this.archiveNote}
                    uploadImage={this.uploadImage}
                />
            )
        }
        else if (this.props.navigateArchived) {
            return (
                <ArchivedNavigator
                    archiveArray={archiveArray(this.state.notes)}
                    pinNote={this.pinNote}
                    othersArray={otherArray}
                    getColor={this.getColor}
                    noteProps={this.props.noteProps}
                    reminder={this.reminderNote}
                    trashNote={this.trashNote}
                    archiveNote={this.archiveNote}
                    uploadImage={this.uploadImage}
                />
            )
        }
        else if (this.props.navigateReminder) {
            return (
                <ReminderNavigator
                    remiderArray={remiderArray(this.state.notes)}
                    pinNote={this.pinNote}
                    othersArray={otherArray(this.state.notes)}
                    getColor={this.getColor}
                    noteProps={this.props.noteProps}
                    reminder={this.reminderNote}
                    trashNote={this.trashNote}
                    archiveNote={this.archiveNote}
                    uploadImage={this.uploadImage}
                />
            )
        }
        else if (this.props.navigateTrashed) {
            return (
                <TrashNavigator
                    trashArray={trashArray(this.state.notes)}
                    pinNote={this.pinNote}
                    othersArray={otherArray(this.state.notes)}
                    getColor={this.getColor}
                    noteProps={this.props.noteProps}
                    trashNote={this.trashNote}
                    deleteNote={this.deleteNote}
                />
            )
        }
        else {
            let cardsView = this.props.noteProps ? "listCards" : "cards";
            return (
                <MuiThemeProvider theme={theme}>
                    {pinArray(this.state.notes).length !== 0 ?
                        <PinAndOthers
                            createNotePropsToTools={this.getColor}
                            pinArray={pinArray(this.state.notes)}
                            pinNote={this.pinNote}
                            othersArray={otherArray(this.state.notes)}
                            getColor={this.getColor}
                            noteProps={this.props.noteProps}
                            reminder={this.reminderNote}
                            trashNote={this.trashNote}
                            archiveNote={this.archiveNote}
                            uploadImage={this.uploadImage}
                        />
                        :
                        <div className="CardsView" >
                            {
                                Object.keys(notesArray).slice(0).reverse().map((key) => {
                                    return (
                                        <div key={key} id="cardsViewDiv">
                                            <Card className={cardsView} style={{ backgroundColor: notesArray[key].color, borderRadius: "15px", border: "1px solid #dadce0" }}>
                                                <div >
                                                    <div>
                                                        {notesArray[key].image !== "" ?
                                                            <img style={{
                                                                maxWidth: "100%",
                                                                height: "auto"
                                                            }} src={notesArray[key].image} alt="cardImage"></img>
                                                            :
                                                            null}
                                                    </div>
                                                    <div onClick={() => this.handleClick(notesArray[key])} style={{ display: "flex", justifyContent: "space-between" }}>
                                                        <b> {notesArray[key].title}</b>
                                                        <EditPin
                                                            cardPropsToPin={this.pinNote}
                                                            noteID={notesArray[key]._id}
                                                            pinStatus={notesArray[key].pinned}
                                                        />
                                                    </div>
                                                    <DialogBox
                                                        ref={this.cardsToDialogBox}
                                                        parentProps={this.state.open1}
                                                        handleEdit={this.handleClick}
                                                        closeEditBox={this.closeEditBox}
                                                        note={notesArray[key].note}
                                                        editTitle={this.editTitle}
                                                        editDescription={this.editDescription}
                                                        createNotePropsToTools={this.getColor}
                                                    />
                                                    <div onClick={() => this.handleClick(notesArray[key])} style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                                                        {notesArray[key].description}
                                                    </div >
                                                    <div>
                                                        {/* <img src={clockIcon} alt="clockIcon" /> */}
                                                        {notesArray[key].reminder ?
                                                            <Chip
                                                                label={notesArray[key].reminder}
                                                                onDelete={() => this.reminderNote('', notesArray[key]._id)}
                                                            />
                                                            :
                                                            null}
                                                    </div>
                                                </div>
                                                <div id="displaycontentdiv">
                                                    <Tools
                                                        createNotePropsToTools={this.getColor}
                                                        archiveNote={this.archiveNote}
                                                        noteID={notesArray[key]._id}
                                                        archiveStatus={notesArray[key].archive}
                                                        reminder={this.reminderNote}
                                                        note={notesArray[key].note}
                                                        trashNote={this.trashNote}
                                                        uploadImage={this.uploadImage}
                                                    />
                                                </div>
                                            </Card>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                </MuiThemeProvider>
            );
        }
    }
}


