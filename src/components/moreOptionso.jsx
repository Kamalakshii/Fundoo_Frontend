import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Tooltip from "@material-ui/core/Tooltip";
import Fade from "@material-ui/core/Fade";
import { MenuItem } from "@material-ui/core";
import AddLabelsOnNote from "./labels";
import { Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import "../App.css";
export default class MoreOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
      placement: null,
      isTrashed: false,
      snackBarMessage: "",
      openSnackBar: false,
      alertMessage: ""
    };

    this.moreOptionsToAddLabels = React.createRef();
    this.clickMoreOptions = this.clickMoreOptions.bind(this);
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
  // async handleTrashedNotes() {
  //  console.log("(this.props.trashStatus", this.state.isTrashed);
  //   if (this.props.trashStatus === false) {
  //   await this.setState({ isTrashed: true });
  //   this.setState({
  //   openSnackBar: true,
  //   snackBarMessage: "Note Trashed"
  //   });
  //   // console.log("this.state.isTrash changed", this.state.isTrash);
  //   this.props.trashNote(this.state.isTrashed, this.props.noteID);
  //   } else {

  //   this.setState({ isTrashed: false });
  //   console.log(" this.state.isTrash change in elseeeee", this.state.isTrashed);
  //   this.props.trashNote(this.state.isTrashed, this.props.noteID);
  //   }
  //   };

  /**
     * @description:it will open the more options event and in that 
                    we can select add the labels and delete notes operations
     * @param {*open the more options event} event 
     */
  clickMoreOptions(event) {
    try {
      const { currentTarget } = event;
      this.setState(state => ({
        anchorEl: currentTarget,
        open: !state.open,

      }));
    } catch (err) {
      console.log("error at clickMoreOptions in moreOptions");
    }
  }
  /**
     * @description:it will handle add label to notes
     */
  handleLabelsOnNote = (event) => {
    try {
      this.setState({
        open: false
      })
      this.moreOptionsToAddLabels.current.addLabelPopup(event);
    } catch (err) {
      console.log("error at handleLabelOnNote in moreOptions");
    }
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
          transition style={{ zIndex: 9999 }}
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
                    <MenuItem onClick={this.handleLabelsOnNote}>Add Label</MenuItem>
                  </div>
                </ClickAwayListener>
              </Paper>
            </Fade>
          )}
        </Popper>
        <AddLabelsOnNote
          ref={this.moreOptionsToAddLabels}
          noteID={this.props.noteID}
          addLabelToNote={this.props.addLabelToNote}
          anchorEl={this.state.anchorEl}
        />
        <div>
          <addNotification />
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