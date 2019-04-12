/********************************************************************************
 *  @Purpose        : To create a login page for login to the registered account.
 *  @file           : login.jsx        
 *  @author         : KAMALAKSHI C SWAMY
 *  @since          : 25-03-2019
 *********************************************************************************/
import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { userLogin } from "../services/userServices";
import "../App.css";
export default class login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            snackBarMessage: "",
            showPassword: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    registrationclick = e => {
        try {
            e.preventDefault();
            this.props.history.push('/registration');
        } catch (err) {
            console.log("error at registrationclick in login");
        }
    };
    handleSnackClose = () => {
        try {
            this.setState({
                openSnackBar: false
            })
        } catch (err) {
            console.log("error at handleSnackClose in login");
        }
    };
    handleEmailChange = event => {
        try {
            const email = event.target.value;
            this.setState({ email: email });
        } catch (err) {
            console.log("error at handleEmailChange in login");
        }
    }
    handleClickShowPassword = () => {
        try {
            this.setState(state => ({ showPassword: !state.showPassword }));
        } catch (err) {
            console.log("error at handleClickShowPassword in login");
        }
    };
    handleChange = prop => event => {
        try {
            this.setState({ [prop]: event.target.value });
        } catch (err) {
            console.log("error at handleChange in login");
        }
    };
    forgotPasswordPage = e => {
        try {
            e.preventDefault();
            this.props.history.push('/forgotPassword');
        } catch (err) {
            console.log("error at forgotPasswordPage in login");
        }
    };
    handleSubmit = event => {
        try {
            event.preventDefault();
            if (!this.state.email) {
                this.setState({
                    openSnackBar: true,
                    snackBarMessage: "email cannot be empty..!"
                });
            } else if (!this.state.password) {
                this.setState({
                    openSnackBar: true,
                    snackBarMessage: "password cannot be empty..!"
                });
            } else if (
                !/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.email)
            ) {
                this.setState({
                    openSnackBar: true,
                    snackBarMessage: "Invalid email..!"
                });
            } else if (this.state.password.length < 8) {
                this.setState({
                    openSnackBar: true,
                    snackBarMessage: "Password should contain minimum 8 characters..!"
                });
            }
            else {
                var data = {
                    email: this.state.email,
                    password: this.state.password
                }
                userLogin(data)
                    .then((response) => {
                        console.log("response is  ==================>",response);
                        this.setState({
                            openSnackBar: true,
                            snackBarMessage: "Login Successfull!!"
                        });
                         localStorage.setItem('username', response.data.result.firstname)
                         console.log("in login_________________",response.data.result.firstname);
                         
                          localStorage.setItem('email', response.data.result.email)
                         localStorage.setItem('userId', response.data.result._id)
                    localStorage.setItem('token', response.data.token.token)
                    localStorage.setItem('profilePic', response.data.result.profilePic);
                    //    console.log("hhhhhhh",response.token);
                        this.props.history.push('/dashBoard');
                    })
                    .catch((err) => {
                        console.log("err==>",err);
                        this.setState({
                            openSnackBar: true,
                            snackBarMessage: "Login failed!!"
                        });
                    });
            }
        } catch (err) {
            console.log("error at handleSubmit in login");
        }
    }
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
                    <div id="font">
                        <h3>Sign in</h3>
                        <p>with your Fundoo Account</p>
                    </div>
                    <div id="email-input">
                        <TextField
                            id="email"
                            variant="outlined"
                            label={" Enter email"}
                            value={this.state.email}
                            onChange={this.handleEmailChange}
                            onKeyPress={this.handleEnter}
                            autoComplete="email"
                        />
                    </div>
                    <div id="password-input">
                        <TextField
                            variant="outlined"
                            id="password"
                            type={this.state.showPassword ? 'text' : 'password'}
                            label="Enter password"
                            value={this.state.password}
                            onKeyPress={this.handleEnter}
                            onChange={this.handleChange('password')}
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
                    <div id="submitbutton" >
                        <Button
                            size="small"
                            variant="contained"
                            title="click on submit"
                            color="primary"
                            value="click me"
                            onClick={this.handleSubmit}>
                            Submit
                        </Button>
                    </div>
                    <div >
                        <Button
                            id="forgotbutton"
                            size="small"
                            color="primary"
                            onClick={this.forgotPasswordPage}>
                            Forgot password?
                        </Button>
                    </div>
                    <div >
                        <Button
                            id="createbutton"
                            size="small"
                            color="primary"
                            title="click on create account"
                            onClick={this.registrationclick}>
                            create account
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

        );
    }
}
