/****************************************************************************************
 *  @Purpose        : to display the notes that are deleted.
 *  @file           : trashNavigator.jsx       
 *  @author         : KAMALAKSHI C SWAMY 
 *  @since          : 08-04-2019
 *****************************************************************************************/
import React, { Component } from 'react';
import { Card, MuiThemeProvider, createMuiTheme,Chip } from '@material-ui/core';
import TrashOptions from '../components/trashOption';
import ResponsiveDialog from '../components/dilogBox'
import Tools from '../components/toolbar';
const theme = createMuiTheme({
    overrides: {
        MuiChip: {
            root: {
                fontSize: 10,
                height: 20,
                backgroundColor: "rgba(0, 0, 0, 0.10)"
            }
        },
    },
    typography: {
        useNextVariants: true,
    },
})
export default class TrashNavigator extends Component {
    constructor() {
        super();
        this.state = {
            open1: false
        }
        this.cardsToDialogBox = React.createRef();
    }
    handleClose = (evt) => {
        this.setState({ open1: false })
    } 
    async handleClick(note) {
        console.log('note data ' + note);
        console.log("note--------------------->", note);
        this.cardsToDialogBox.current.getData(note);
        await this.setState({ open1: true })
    }
    render() {
        let cardsView = this.props.noteProps ? "listCards" : "cards";
        return (
            <MuiThemeProvider theme={theme} >
            <div className ="trashMessage">
              {(this.props.trashArray).length === 0 ?
              <div > <img src={require("../assets/recycle.svg")} className ="recycleicon"/>
                    <h1  style={{ fontFamily: "Google Sans',Roboto,Arial,sans-serif", color: "#80868b" ,marginLeft:"18%" }}>No notes in Recycle Bin</h1></div>
                :
                    <label style={{ fontFamily: "georgia", fontSize: "15px", color: "grey", marginRight: "760px" }}></label>
                }
             </div>
                {/* <label style={{ fontFamily: "cursive", fontSize: "18px", color: "grey", marginLeft: "500px" }}>TRASH</label> */}
                <div className="CardsViewTrash"  >
                    {this.props.trashArray.map((key) => {
                        return (
                            <Card className={cardsView} style={{ backgroundColor: key.color, borderRadius: "15px", border: "1px solid #dadce0", wordBreak: "break-word" }} >
                                <div>
                                    <div onClick={()=>this.handleClick(key)} style={{ display: "flex", justifyContent: "space-between" }}>
                                        <b>{key.title}</b>
                                    </div>
                                    <div  onClick={()=>this.handleClick(key)} style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                                        {key.description}
                                    </div>
                                </div>
                                <TrashOptions
                                    restore={this.props.trashNote}
                                    noteID={key._id}
                                    deleteNote={this.props.deleteNote}
                                />
                                 {key.label.length > 0 ?
                                        key.label.map((key1) =>
                                            <Chip
                                                label={key1}
                                            />
                                        )
                                        :
                                        null}  
                                        <div id="displaycontentdiv">
                                  
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
                    ></ResponsiveDialog>
            </MuiThemeProvider>
        )
    }
}

