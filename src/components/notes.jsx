/*****************************************************************************************************
 *  @Purpose        : to display notes in the dashbord
 *  @file           : notes.jsx       
 *  @author         : KAMALAKSHI C SWAMY
 *  @since          : 31-03-2019
 *****************************************************************************************************/
import React, { Component } from 'react';
import { Card, Chip, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import Tools from '../components/toolbar';
import { getNotes, updateColor, setReminder, otherArray, isTrashed, updateArchiveStatus } from '../services/noteServices';
import '../App.css';
import DialogBox from '../components/dilogBoxo';
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
            notes: [],
            open:false,

        }
    }
    async handleClick(note) {
        console.log('note data ' + note);
        console.log("note--------------------->", note);
        // this.cardsToDialogBox.current.getData(note);;
        await this.setState({ open: true })
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
    // trashNote = (value, noteId) => {
    //     const isTrash = {
    //       noteID: noteId,
    //       trash: value
    //     };
    //     console.log("isTrash=========>", isTrash);
    
    //     updateTrashStatus(isTrash)
    //       .then(result => {
    //         let newArray = this.state.notes;
    //         for (let i = 0; i < newArray.length; i++) {
    //           if (newArray[i]._id === noteId) {
    //             newArray[i].trash = result.data.data;
    //             this.setState({
    //               notes: newArray
    //             });
    //           }
    //         }
    //       })
    //       .catch(error => {
    //         alert(error);
    //       });
    //   };
    trashNote = (noteId) => {
        const trash = {
            noteID: noteId
        }
        console.log("In Trash note->",trash);       
        isTrashed(trash)
            .then((result) => {
            //    console.log("ressssssssss----------",trash);
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
    render() {
        let notesArray = otherArray(this.state.notes);
let note =this.state.note
        let cardsView = this.props.noteProps ? "listCards" : "cards";
        return (
            <div className="root">
            <MuiThemeProvider theme={theme}>
                <div className="CardsView" >
                    {
                        Object.keys(notesArray).slice(0).reverse().map((key) => {
                            return (
                                <div key={key} id="gap" >
                                    <Card className={cardsView} style={{ backgroundColor: notesArray[key].color, borderRadius: "15px", padding:"3%",border: "1px solid #dadce0" }}>
                                        <div>              
                                            <div onClick={() => this.handleClick(notesArray[key])} style={{ display: "flex", justifyContent: "space-between" }}>
                                                <b> {notesArray[key].title}</b>
                                            </div>
                                            <div onClick={() => this.handleClick(notesArray[key])} style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                                                {notesArray[key].description}
                                            </div >
                                            <div onClick={()=>this.handleClick(note)}>
                                            </div>
                                            <div id="dispNote">
                                            <div
                                            style={{
                                                display:"flex",
                                                justifyContent:"space-between",
                                                wordBreak:"break-word"
                                            }}
                                            ></div>
                                            </div>
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
                                                noteID={notesArray[key]._id}
                                                note={notesArray[key].note}
                                                reminder={this.reminderNote}
                                                archiveNote={this.archiveNote}
                                                archiveStatus={notesArray[key].archive}
                                                trashNote={this.trashNote}
                                                trashStatus={notesArray[key].trash}
                                            />
                                        </div>
                                    </Card>
                                </div>
                            )
                        })
                    }
                </div>
                <DialogBox
                        ref={this.cardsToDialogBox}
                        parentProps={this.state.open1}    
                    />
                </MuiThemeProvider>
                </div>
        );
    }
}


