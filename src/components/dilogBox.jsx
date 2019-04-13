import React from 'react';
import {  Input, MuiThemeProvider, createMuiTheme, Chip } from '@material-ui/core';
import PropTypes from 'prop-types';
import Tools from '../components/toolbar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
const theme = createMuiTheme({
  overrides: {
      MuiDialog: {
          paper: {
              borderRadius: "20px",
              // boxShadow: "0 3px 5px rgba(0, 0, 0, 0.20)",
              overflowY: "inherit",
              border: "none",
          }
      },
      MuiBackdrop:
      {
          root: {
              backgroundColor: "rgba(11, 11, 11, 0.18)"
          }
      },
      MuiInputBase:
      {
          multiline: {
              padding: "9px 30px 7px"
          }

      },
      MuiChip: {
          root: {
              fontSize: "12px",
              height: "30px",
              backgroundColor: "rgba(0, 0, 0, 0.10)",
              cursor: "zoom-in",
              marginTop: "15px"
          }
      },
  },
  typography: {
      useNextVariants: true,
  },
})
class ResponsiveDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => { 
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  async handleToggle(e) {
    console.log("this.state.title==>", this.state.title);
    console.log("this.state.description==>", this.state.description);
 
}
  render() {

    return (
      <div>
        <MuiThemeProvider theme={theme}>
                <Dialog
                     style={{ overflow: "scroll" }}
                    aria-labelledby="responsive-dialog-title"
                    open={this.props.parentProps}
                // noteID={this.props.noteID}
                >
                    <div id="dialogbox" style={{ backgroundColor: this.state.color }} >
                        <div>
                            {this.state.image ?
                                <img style={{ maxWidth: "100%", height: "auto" }}
                                    src={this.state.image} alt="cardImage">
                                </img>
                                :
                                null
                            }
                        </div>
                        <div className="createNotePinIcon">
                            <Input
                                className="dialogInputBase"
                                disableUnderline={true}
                                placeholder="edit title"
                                multiline
                                value={this.state.title}
                                onChange={this.handleTitleClick}
                            />

                        </div>

                        <div className="cardToolsClose">
                            <Tools
                                createNotePropsToTools={this.createNotePropsToTools}
                                noteID={this.state._id}
                                reminder={this.reminder}
                                archiveStatus={this.state.archive}
                                archiveNote={this.archiveNote}
                                trashNote={this.trashNote}
                                //uploadImage={this.uploadImage}
                                uploadImage={this.props.uploadImage}
                            />
                            <Button id="doneButton" onClick={this.handleToggle.bind(this)}>Close</Button>
                        </div>
                    </div>
                </Dialog>
            </MuiThemeProvider>
        {/* <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog> */}
      </div>
    );
  }
}

ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default (ResponsiveDialog);