import React, { Component } from 'react';
import { Input, Card ,createMuiTheme, MuiThemeProvider} from '@material-ui/core'
import { createNote } from '../services/noteServices';
import { Button } from '@material-ui/core';
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
export default class createNotes extends Component{
    constructor(props){
        super(props);
        this.state={
            openNote: false,   title: "",
            description: "",
        } 
        this.handleTitle = this.handleTitle.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }
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
    handleToggle() {
        try {
            this.setState({ openNote: !this.state.openNote });
            // console.log("pinned", this.state.openNote);
            if (this.state.title !== '' || this.state.description !== '' ) {
                const note = {
                    userId: localStorage.getItem('userId'),
                    title: this.state.title,
                    description: this.state.description,
                   
                }
                createNote(note)
                    .then((result) => {
                        console.log("create note result from back-end====>", result.data.data);
                        this.setState({
                            newNote: result.data.data.note
                        })
                      //  this.props.getNewNote(this.state.newNote)
                    })
                    .catch((error) => {
                        alert(error);
                    })
                this.setState({
                    title: "",
                    description: "",
                  
                })
            }
        } catch (err) {
            console.log("error at handleToggle in createNotes");
        }
    }
    render()
    {
     
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
                            
                            <Button onClick={this.handleToggle}>close</Button>
                        </div>
                       
                        </Card>
                    </div>
                </MuiThemeProvider>
            )
        }
    }
           
        
    