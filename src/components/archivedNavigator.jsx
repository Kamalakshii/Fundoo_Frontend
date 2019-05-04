/****************************************************************************************
 *  @Purpose        : to display the notes that are archived.
 *  @file           : archivedNavigator.jsx       
 *  @author         : KAMALAKSHI C SWAMY 
 *  @since          : 16-004-2019
 *****************************************************************************************/
import React, { Component } from 'react';
import { Card, MuiThemeProvider, createMuiTheme, Chip } from '@material-ui/core';
import Tools from '../components/toolbar';
import ResponsiveDialog from "../components/dilogBox"
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
export default class ArchivedNavigator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openSnackBar: false,
            open1: false,
            open: false
        }
        this.cardsToDialogBox = React.createRef();
    }
    async handleClick(note) {
        console.log('note data ' + note);
        console.log("note--------------------->", note);
        this.cardsToDialogBox.current.getData(note);
        await this.setState({ open1: true })
    }
    handleClose = (event) => {
        this.setState({ open1: false })
    }
    /**
    * @description:use to auto close snackBar
    */
    handleSnackClose = () => {
        try {
            this.setState({
                openSnackBar: false
            })
        } catch (err) {
            console.log("error at handleSnackClose in login");
        }
    };
    handleReminder = placement => event => {
        try {
            const { currentTarget } = event;
            this.setState(state => ({
                anchorEl: currentTarget,
                open: state.placement !== placement || !state.open,
                placement,
            }));
        } catch (err) {
            console.log("error at handleReminder in reminder");
        }
    };
    render() {
        let cardsView = this.props.noteProps ? "listCards" : "cards";
        return (
            <MuiThemeProvider theme={theme}>
                <div className="archiveMessage">
                    {(this.props.archiveArray).length === 0 ?
                        <div > <img src={require("../assets/archive.svg")} className="archiveicon" />
                            <h1 style={{ fontFamily: "Google Sans',Roboto,Arial,sans-serif", color: "#80868b", marginLeft: "20%" }}>Your Archived Notes Appear Here</h1></div>
                        :
                        null
                    }
                </div>
                <div className="CardsViewArchive">
                    {this.props.archiveArray.map((key) => {
                        return (
                            <Card className={cardsView} style={{ backgroundColor: key.color, borderRadius: "15px", border: "1px solid #dadce0", wordBreak: "break-word" }}>
                                <div className="DispCont" >
                                    <div onClick={() => this.handleClick(key)} style={{ display: "flex", justifyContent: "space-between" }}>
                                        <b> {key.title}</b>
                                    </div>
                                    <div onClick={() => this.handleClick(key)} style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                                        {key.description}
                                    </div >
                                    <div onClick={this.handleReminder('bottom-start')}></div>
                                    {key.reminder ?
                                        <Chip
                                            label={key.reminder}
                                            onDelete={() => this.props.reminderNote("", key._id)} />
                                        :
                                        null}
                                    {key.label.length > 0 ?
                                        key.label.map((key1) =>
                                            <Chip
                                                label={key1}
                                                onDelete={() => this.props.deleteLabelFromNote(key1, key._id)}
                                            />
                                        )
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
                                        addLabelToNote={this.props.addLabelToNote}       
                                        deleteLabelFromNote={this.props.deleteLabelFromNote}                        
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
                    archiveNote={this.props.archiveNote}
                    reminder={this.props.reminderNote}
                    createNotePropsToTools={this.getColor}
                    editTitle={this.props.editTitle}
                    editDescription={this.props.editDescription}
                    addLabelToNote={this.props.addLabelToNote}
                    deleteLabelFromNote={this.props.deleteLabelFromNote}
                ></ResponsiveDialog>
            </MuiThemeProvider>
        )
    }
}

