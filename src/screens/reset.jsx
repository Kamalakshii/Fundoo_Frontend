import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Snackbar from '@material-ui/core/Snackbar';
import { resetPassword } from "../services/userServices";
import CloseIcon from '@material-ui/icons/Close';
export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            newPassword: "",
            snackBarMessage: "",
            showPassword: false,
            showPassword1: false
        };
        this.baseState = this.state;
    }
    handleChange = prop => event => {
        try {
            this.setState({ [prop]: event.target.value });
        } catch (err) {
            console.log("error at handleChange in resetPassword");
        }
    };
    handleEnter = event => {
        try {
            if (event.key === 'Enter') {
                event.preventDefault();
                this.handleSubmit(event);
            }
        } catch (err) {
            console.log("error at handleEnter in resetPassword");
        }
    };
     /**
     * @description:it will displays the entered password 
     */
    handleClickShowPassword = () => {
        try {
            this.setState(state => ({ showPassword: !state.showPassword }));
        } catch (err) {
            console.log("error at handleClickShowPassword in resetPassword");
        }
    };
    /**
     * @description:it will displays the entered password 
     */
    handleClickShowPassword1 = () => {
        try {
            this.setState(state => ({ showPassword1: !state.showPassword1 }));
        } catch (err) {
            console.log("error at handleClickShowPassword1 in resetPassword");
        }
    };
    handleSnackClose = () => {
        try {
            this.setState({
                openSnackBar: false
            })
        } catch (err) {
            console.log("error at handleSnackClose in resetPassword");
        }
    };
   
    handleSubmit = event => {
        try {
            event.preventDefault();
            if (this.state.password === "") {
                this.setState({
                    openSnackBar: true,
                    snackBarMessage: "password cannot be empty"
                });
            } else if (this.state.newPassword === "") {
                this.setState({
                    openSnackBar: true,
                    snackBarMessage: "Confirm Password cannot be empty"
                });
            } else if (this.state.password.length < 8) {
                this.setState({
                    openSnackBar: true,
                    snackBarMessage: "password should contain minimum 8 characters "
                });
            } else if (this.state.newPassword.length < 8) {
                this.setState({
                    openSnackBar: true,
                    snackBarMessage: "Confirm Password shoud contain minimum 8 characters "
                });
            } else if (this.state.password !== this.state.newPassword) {
                this.setState({
                    openSnackBar: true,
                    snackBarMessage: "Password and Confirm password should be same"
                });
            } else {
                event.preventDefault();
                let current_url = window.location.pathname;
                let verify_user_token = current_url.substr(19);
                console.log("tokennnn.....",verify_user_token);
                console.log("current ", current_url);
                resetPassword(this.state.password, verify_user_token)
                    .then((response) => {
                        console.log(response);
                        this.setState({
                            openSnackBar: true,
                            snackBarMessage: "Password changed successfully"
                        });
                        this.props.history.push("/login");
                    })
                    .catch((err) => {
                        console.log(err);
                        this.setState({
                            openSnackBar: true,
                            snackBarMessage: "Please Try Again.."
                        });
                    });
            }
        } catch (err) {
            console.log("error at handleSubmit in resetPassword");
        }
    };
    render() {
        return (
            <div>
                 <div className="box">
                <div id="fundoofont">
                    <h4>
                        <span id="font-F">F</span>
                        <span id="font-u">u</span>
                        <span id="font-n">n</span>
                        <span id="font-d">d</span>
                        <span id="font-o">o</span>
                        <span id="font-o">o</span>
                    </h4>
                </div>
                <div  id ="statement2">
                <h2>Reset your Password</h2>
                <p>Please choose a new password to finish signing in</p>
                </div>
                <div id="passwordInput-reset">
                        <TextField
                        id= "password"
                            className="newpassword"
                            variant="outlined"
                            type={this.state.showPassword ? 'text' : 'password'}
                            label={"New Password"}
                            margin="normal"
                            onChange={this.handleChange('password')}
                            onKeyPress={this.handleEnter}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="Toggle password visibility"
                                            onClick={this.handleClickShowPassword}
                                        >
                                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <div id="passwordInput-reset">
                        <TextField
                            className="newpassword"
                            id="newPassword"
                            variant="outlined"
                            type={this.state.showPassword1 ? 'text' : 'password'}
                            label={"Re-enter new password"}
                            margin="normal"
                            onChange={this.handleChange('newPassword')}
                            onKeyPress={this.handleEnter}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="Toggle password visibility"
                                            onClick={this.handleClickShowPassword1}
                                        >
                                            {this.state.showPassword1 ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
            <div id="submitbutton-reset" >
           
                        <Button
                            size="small"
                            variant="contained"
                            title="click on submit"
                            color="primary"
                            value="click me"
                            onClick={this.handleSubmit}>
                         
                        Change password
                        </Button>
                    </div>
            </div>
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
                    message={<span id="message-id"> {this.state.snackBarMessage} </span>}
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
        )
    }
}
export {ResetPassword};
