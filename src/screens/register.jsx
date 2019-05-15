/********************************************************************************
 *  @Purpose        : Create a registration page to register the users .
 *  @file           : register.jsx        
 *  @author         : KAMALAKSHI C SWAMY
 *  @since          : 24-03-2019
 *********************************************************************************/
import React from "react";
import "../App.css";
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { userRegister } from "../services/userServices";

export default class registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            profilePic: "",
            confirmPassword: "",
            snackBarMessage: ""
        }
        this.baseState = this.state;
    }
    handleuserfirstNameChange = event => {
        try {
            const firstname = event.target.value;
            this.setState({ firstname: firstname });
        } catch (err) {
            console.log("error at handleuserfirstNameChange in registration");
        }
    };
    handleSnackClose = () => {
        try {
            this.setState({
                openSnackBar: false
            })
        } catch (err) {
            console.log("error at handleSnackClose in registration");
        }
    };
    handleuserlastNameChange = event => {
        try {
            const lastname = event.target.value;
            this.setState({ lastname: lastname });
        } catch (err) {
            console.log("error at handleuserlastNameChange in registration");
        }
    };
    handleuserEmailChange = event => {
        try {
            const email = event.target.value;
            this.setState({ email: email });
        } catch (err) {
            console.log("error at handleuserEmailChange in registration");
        }
    };
    handleChange = prop => event => {
        try {
            this.setState({ [prop]: event.target.value });
        } catch (err) {
            console.log("error at handleChange in registration");
        }
    };
    handleEnter = event => {
        try {
            if (event.key === 'Enter') {
                event.preventDefault();
                this.handleSubmit(event);
            }
        } catch (err) {
            console.log("error at handleEnter in registration");
        }
    };
    loginclick = event => {
        try {
            event.preventDefault();
            this.props.history.push("/login");
        } catch (err) {
            console.log("error at loginclick in registration");
        }
    };
    handleSubmit = event => {
        try {
            event.preventDefault();
            if (this.state.firstname === "") {
                this.setState({
                    openSnackBar: true,
                    snackBarMessage: "firstName cannot be empty..!"
                });
            } else if (this.state.lastname === "") {
                this.setState({
                    openSnackBar: true,
                    snackBarMessage: "lastName cannot be empty..!"
                });
            } else if (this.state.email === "") {
                this.setState({
                    openSnackBar: true,
                    snackBarMessage: "email cannot be empty..!"
                });
            } else if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.email)) {
                this.setState({
                    openSnackBar: true,
                    snackBarMessage: "Invalid email..!"
                });
            } else if (this.state.password === "") {
                this.setState({
                    openSnackBar: true,
                    snackBarMessage: "password cannot be empty..!"
                });
            } else if (this.state.password.length < 8) {
                this.setState({
                    openSnackBar: true,
                    snackBarMessage: "password should contain minimum 8 characters!"
                });
            } else if (this.state.confirmPassword === "") {
                this.setState({
                    openSnackBar: true,
                    snackBarMessage: "Confirm password cannot be empty..!"
                });
            } else if (this.state.password !== this.state.confirmPassword) {
                this.setState({
                    openSnackBar: true,
                    snackBarMessage: "password and confirm password must be same..!"
                });
            }
            else {
                var data = {
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    email: this.state.email,
                    password: this.state.password,
                    profilePic: this.state.profilePic
                }
                // console.log("data in reggg....",data);

                userRegister(data)
                    .then((response) => {
                        console.log("The registration response from backend  is =>", response);
                        this.setState({
                            openSnackBar: true,
                            snackBarMessage: "Registered Successfully!!"
                        });
                        this.props.history.push("/login");
                    })
                    .catch((err) => {
                        console.log("err=>", err);
                        this.setState({
                            openSnackBar: true,
                            snackBarMessage: "Register Failed"
                        });
                    });
            }
        } catch (err) {
            console.log("error at handleSubmit in registration");
        }
    };

    render() {
        return (
            <div >
                <div className="box_register">
                    <div id fundoofont_register>
                        <p>
                            <span id="font-F">F</span>
                            <span id="font-u">u</span>
                            <span id="font-n">n</span>
                            <span id="font-d">d</span>
                            <span id="font-o">o</span>
                            <span id="font-o">o</span>
                        </p>
                    </div>
                    <div id="font_register">
                        <p>Create your Fundoo Account</p>
                    </div>
                    <div id="firstname-input">
                        <TextField
                            id="firstname"
                            variant="outlined"
                            label={"First name"}
                            value={this.state.firstname}
                            onKeyPress={this.handleEnter}
                            onChange={this.handleuserfirstNameChange}
                            autoComplete="firstname"
                        />
                        <TextField
                            id="lastname"
                            variant="outlined"
                            label={"Last name"}
                            value={this.state.lastname}
                            onKeyPress={this.handleEnter}
                            onChange={this.handleuserlastNameChange}
                            autoComplete="lastname"
                        />
                    </div>

                    <div >
                        <TextField
                            className="username"
                            variant="outlined"
                            label={"Email"}
                            margin="normal"
                            id="email"
                            value={this.state.email}
                            onKeyPress={this.handleEnter}
                            onChange={this.handleuserEmailChange}
                            autoComplete="Email"
                        />
                    </div>
                    <div className="statement1">
                        <p>you can use letters,numbers & periods</p>
                    </div>
                    <div id="firstname-input">
                        <TextField
                            id="password"
                            variant="outlined"
                            type={this.state.showPassword ? 'text' : 'password'}
                            label={"Password"}
                            value={this.state.password}
                            onChange={this.handleChange('password')}
                            onKeyPress={this.handleEnter}
                        />
                        <TextField
                            id="confirm-password"
                            variant="outlined"
                            type={this.state.showPassword ? 'text' : 'password'}
                            label={"Confirm"}
                            value={this.state.confirmPassword}
                            onChange={this.handleChange('confirmPassword')}
                            onKeyPress={this.handleEnter}
                        />
                    </div>
                    <div className="statement2">
                        <p>Use 8 or more characters with a mix of letters, numbers & symbols</p>
                    </div>
                    <div>
                        <div id="button-signIn">
                            <Button
                                size="small"
                                color="primary"
                                onClick={this.loginclick}
                            >
                                Sign in instead
                        </Button>
                        </div>
                    </div>
                    <div className="button-next">
                        <Button
                            size="small"
                            variant="contained"
                            title="click to sign in"
                            color="primary"
                            onClick={this.handleSubmit}
                        >
                            Next
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

