import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Tooltip from "@material-ui/core/Tooltip";
import Fade from "@material-ui/core/Fade";
import { MenuItem } from "@material-ui/core";
import { Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import "../App.css";
import zIndex from "@material-ui/core/styles/zIndex";

export default class MoreOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
      placement: null,
    //isTrash: false,
      snackBarMessage: "",
      openSnackBar: false
    };
  }
  /**
   * @description:it will toggle or reback the event
   */
  handleToggle = () => {
    try {
      this.setState(state => ({ open: !state.open }));
    } catch (err) {
      console.log("error at handleToggle1 in moreOptions");
    }
  };
  /**
   * @description:it will close the current action event
   */
  handleClose = event => {
    try {
      if (this.anchorEl.contains(event.target)) {
        return;
      }
      this.setState({ open: false });
    } catch (err) {
      console.log("error at handleClose in moreOptions");
    }
  };
  /**
   * @description:it will open the more options
   */
  handleClick = placement => event => {
    try {
      const { currentTarget } = event;
      this.setState(state => ({
        anchorEl: currentTarget,
        open: state.placement !== placement || !state.open,
        placement
      }));
    } catch (err) {
      console.log("error at handleClick in popper");
    }
  };
  handleTrashedNotes = () => {
    // this.closeLabelPopper();
    this.props.trashNote(this.props.noteID);
    console.log("dasdasdsa", this.props.noteID);

  }
  /**
   * @description:use to auto close snackBar
   */
  handleSnackClose = () => {
    try {
      this.setState({
        openSnackBar: false
      });
    } catch (err) {
      console.log("error at handleSnackClose in login");
    }
  };
  render() {
    const { anchorEl, open, placement } = this.state;
    return (
      <div>
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement={placement}
          transition style={{zIndex : 9999}}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper id="papperlogout">
                <ClickAwayListener onClick={this.handleToggle}>
                  <div
                    className="popperMain"
                    style={{
                      width: "fit-content",
                      padding: "5px",
                      marginTop: "14px"
                    }}
                  >
                    <MenuItem onClick={this.handleTrashedNotes}>
                      Delete Note
                    </MenuItem>
                    <MenuItem>Add Label</MenuItem>
                  </div>
                </ClickAwayListener>
              </Paper>
            </Fade>
          )}
        </Popper>
        <div>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            open={this.state.openSnackBar}
            autoHideDuration={6000}
            onClose={this.handleSnackClose}
            variant="error"
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">  {this.state.snackBarMessage}</span>}
            action={[
              <div >
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  onClick={this.handleSnackClose}
                >
                  <CloseIcon />
                </IconButton>
              </div>
            ]}
          />
        </div>
        <div className="more">
          <Tooltip title="More options">
            <img
              src={require("../assets/moreOptions.svg")}
              id="ToolButton"
              alt="change color"
              onClick={this.handleClick("bottom-start")}
            />
          </Tooltip>
        </div>
      </div>
    );
  }
}