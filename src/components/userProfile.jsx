/****************************************************************************************
 *  @Purpose        : Here we have to create the user profile.
 *  @file           : userProfile.jsx       
 *  @author         : KAMALAKSHI C SWAMY
 *  @since          : 30-03-2019
 *****************************************************************************************/
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Popper from '@material-ui/core/Popper';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import '../App.css';
const styles = theme => ({
  typography: {
    padding: theme.spacing.unit * 2,
  },
});

export default class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
      placement: null,
      profilepic: ""
    };
  }
   /**
     * @description:it trigger the event and enter into our file
     */
    triggerInputFile() {
      try {
          this.fileInput.click();
      } catch (err) {
          console.log("error at triggerInputFile in userProfile");
      }
  }
  /**
   * @description:it will toggle or reback the event
   */
  handleToggle = () => {
    try {
      this.setState(state => ({ open: !state.open }));
    } catch (err) {
      console.log("error at handleToggle1 in userProfile");
    }
  };
 /**
    * @description:it will redirect to registration page
    */
   handlelogout = event => {
    try {
        event.preventDefault();
        localStorage.clear();
        this.props.props.props.history.push("/login");
    } catch (err) {
        console.log("error at registrationclick in userProfile");
    }
};
  /**
     * @description:it will upload the image
     * @param {*} evt 
     */
    uploadImage(evt) {
      try {
          console.log("upload image", evt.target.files[0]);
          this.props.uploadImage(evt.target.files[0], this.props.note._id)
      } catch (err) {
          console.log("error at uploadImage in userProfile");
      }
  }
/**
 * @description:it will redirect to login page
 */
handleregister = event => {
    try {
        event.preventDefault();
        this.props.props.props.history.push("/registration");
    } catch (err) {
        console.log("error at loginclick in userProfile");
    }
};
  handleClick = placement => event => {
    try {
      const { currentTarget } = event;
      this.setState(state => ({
        anchorEl: currentTarget,
        open: state.placement !== placement || !state.open,
        placement,
      }));
    } catch (err) {
      console.log("error at handleClick in userProfile");
    }
  };

  render() {
    const { anchorEl, open, placement } = this.state;
    const userDetails = localStorage.getItem('username');
    const initial = userDetails.substring(0, 1);
    return (
      <div>
        <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper id="paperlogout">
                <ClickAwayListener onClickAway={this.handleToggle}>
                  <div style={{ width: "280px", padding: "15px", marginTop: "13px" }}>
                    <div id="userProfileDetails">
                      <IconButton id="avatar">
                        <Tooltip title="Change Profile">
                          <Avatar style={{ width: "100px", height: "100px", backgroundColor: "blur" }}
                            onClick={() => { this.triggerInputFile() }}>
                            {this.state.profilePic !== "" ?
                              <img style={{
                                width: "80px", height: "80px"
                              }} src={this.state.profilePic} alt="change Profile pic"></img>
                              :
                              <b style={{ fontSize: "33px" }}>{initial}</b>
                            }
                            <input ref={fileInput => this.fileInput = fileInput}
                              type="file" style={{ 'display': 'none' }}
                              className="uploadImage"
                              onChange={(evt) => this.uploadImage(evt)}
                            />
                          </Avatar>
                        </Tooltip>
                      </IconButton>
                      <span style={{ marginTop: "-1px", marginLeft: "20px" }}>
                        <p style={{ marginBottom: "0px" }}>{'username'}<br></br> </p>
                        <small style={{ marginBottom: "0px" }}>{localStorage.getItem('email')} </small>
                      </span>
                    </div>
                    <Divider />
                    <div id="profilebutton">
                      <Button
                      id="addaccount"
                        onClick={this.handleregister}>Add account</Button>
                      <Button
                      id="signout"
                        onClick={this.handlelogout}>Sign out</Button>
                    </div>
                  </div>
                </ClickAwayListener>
              </Paper>
            </Fade>
          )}
        </Popper>

        <div className="iconButton">
          <IconButton id="userProfileIcon">
            <Tooltip
              title={"Fundoo Account   :" + localStorage.getItem('userDetails')}>
              <Avatar style={{ width: "35px", height: "35px", backgroundColor: "blur" }} onClick={this.handleClick('bottom-end')} >
                {this.state.profilePic !== "" ?
                  <img style={{
                    width: "40px", height: "40px"
                  }} src={this.state.profilePic} alt="change Profile pic"></img>
                  :
                  initial
                }
              </Avatar>
            </Tooltip>
          </IconButton>
        </div>
      </div>
    );
  }
}

