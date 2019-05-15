/********************************************************************************
 *  @Purpose        : to edit labels
 *  @file           : editLabel.jsx        
 *  @author         : KAMALAKSHI C SWAMY
 *  @since          : 30-04-2019
 *********************************************************************************/
import React, { Component } from 'react';
import { Dialog, TextField, Button, createMuiTheme, MuiThemeProvider, Divider, Tooltip } from '@material-ui/core';
import { addLabel, deleteLabel, updateLabel } from '../services/noteServices';
import SnackBar from './snackbar';
import { NotificationManager } from 'react-notifications';
let displayErr = "";
const theme = createMuiTheme({
    overrides: {
        MuiDialog: {
            paperWidthSm: {
                width: "300px",
                borderBottomLeftRadius: "0px",
                borderTopLeftRadius: "0px",
                borderTopRightRadius: "0px",
                borderBottomRightRadius: "0px"
            },
        },
        MuiDialogTitle: {
            root: {
                padding: "0px"
            }
        },
    },
    typography: { 
        useNextVariants: true,
    },
})
class EditLabel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: "",
            labelID: "",
            editLabel: ""
        }
        this.openSnackBar = React.createRef();
    }
    addLabel=(value)=> {
        const label = {
            label: value
        }
        console.log("value is",label);
        
        if (label.label !== "") {
            addLabel( label)
                .then(async (result) => {
                    console.log("label result", result);
                    this.setState({ label: "" });
                    console.log("result in add label--->",result);                            
                    this.props.showLabels(result.data.data);
                })
                .catch((error) => {
                    NotificationManager.error(error);
                    // alert(error)
                });
        }
        else {
            displayErr = "cannot be empty";
            console.log("SAGSGAS");
            this.openSnackBar.current.handleClick();
        }
    }
    deleteLabel=(value)=> {
        const labelId = {
            labelID: value
        }
        deleteLabel(labelId)
            .then(async (result) => {
                if (result.data.status) {
                    console.log("label result", result);
                    let newArray = this.props.label
                    for (let i = 0; i < newArray.length; i++) {
                        if (newArray[i]._id === labelId.labelID) {
                            newArray.splice(i, 1);
                            this.props.newLabels(newArray);
                            this.setState({ labelID: "" })
                        }
                    }
                }
                else {
                    console.log("error");
                }
            })
            .catch((error) => {
                displayErr = "Label deleted";
                this.openSnackBar.current.handleClick();
            });
    }
    editLabel=(Label, id)=> {
        const editLabel = {
            editLabel: Label,
            labelID: id
        }
        updateLabel(editLabel)
            .then((result) => {
                console.log("success", result.data, this.props.label);
                let newArray = this.props.label;
                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i]._id === editLabel.labelID) {
                        newArray[i].label = result.data.data.editLabel;
                        newArray[i].sort();
                        console.log("sorted",newArray);                      
                       this.props.newLabels(newArray);
                        this.setState({ labelID: "" })
                    }
                }
            })
            .catch((error) => {
                displayErr = "label renamed"
                console.log("message", displayErr);
                this.openSnackBar.current.handleClick();
            });
    }
    createLabel=()=> {
         this.setState({ labelID: "" })
    }
    handlEditLabel=(evt)=> {
       
        
        this.setState({ editLabel: evt.target.value });
    }
    changeLables=(id)=> {
        this.setState({ labelID: id })
    }
    handleLabel=(evt)=> {
        
        this.setState({ label: evt.target.value })
    }
    handleToggle=()=> {
        this.props.labelToggle()
    }
    render() {
         return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <Dialog
                        open={this.props.drawerPropstoEditLabels}
                    >
                        <div style={{ padding: "20px", display: "flex", flexDirection: "column" }}>
                            <div style={{ color: "#3c4043", fontWeight: "500" }}>Edit Label</div>
                            <div style={{ display: "flex", justifyContent: "space-between", height: "45px" }} onClick={() => this.createLabel()}>
                                <img src={require('../assets/addLabels.svg')}
                                    alt="Plus icon to add label" />
                                <TextField
                                    id="editLabelTextField"
                                    placeholder="Create New Label"
                                    InputProps={{
                                        disableUnderline: true
                                    }}
                                    value={this.state.label}
                                    onChange={this.handleLabel}
                                />
                                <Tooltip title="Create Label">
                                    <img src={require('../assets/tick.svg')}
                                        alt=" tick icon"  
                                        onClick={() => this.addLabel(this.state.label)} />
                                </Tooltip>
                            </div>
                            {this.props.label.map((key) =>
                                this.state.labelID !== key._id ?
                                    <div onClick={() => this.changeLables(key._id)} key={key._id}
                                        style={{ display: "flex", justifyContent: "space-between", height: "45px", alignItems: "center" }}>
                                        <div style={{ display: "flex", flexDirection: "row" }}>
                                            <div><img src={require('../assets/labelFilled.svg')} alt="filled label icon" /></div>
                                            <div style={{ width: "182px", margin: "0px 15px 0px 15px", fontWeight: "500"  }}>{key.label}</div>
                                        </div>
                                        <div><img src={require('../assets/edit.svg')} alt="edit label icon" /></div>
                                    </div>
                                    :
                                    <div onClick={() => this.changeLables(key._id)}
                                        style={{ display: "flex", justifyContent: "space-between", height: "45px", alignItems: "center" }}>
                                        <div style={{ display: "flex", flexDirection: "row" }}>
                                            <img src={require('../assets/deleteLabel.svg')}
                                                alt="delete label icon"
                                                onClick={() => this.deleteLabel(key._id)} />
                                            <div style={{ width: "182px", margin: "0px 15px 0px 15px", fontWeight: "500" }}>
                                                <TextField
                                                     defaultValue={key.label}
                                                     //value={this.state.editLabel}
                                                    onChange={this.handlEditLabel}
                                                />
                                            </div>
                                        </div>
                                        <div><img src={require('../assets/tick.svg')}
                                            alt="label tick icon"
                                            onClick={() => this.editLabel(this.state.editLabel, key._id)} /></div>
                                    </div>
                            )}
                        </div>
                        <Divider />
                        <div style={{ padding: "10px", display: "flex", flexDirection: "row-reverse" }} >
                            <Button className="editCloseButton" onClick={this.handleToggle.bind(this)}>Done</Button>
                        </div>
                        <SnackBar ref={this.openSnackBar} error={displayErr} />
                    </Dialog>
                </div>
            </MuiThemeProvider>
        )
    }
}
export default EditLabel;