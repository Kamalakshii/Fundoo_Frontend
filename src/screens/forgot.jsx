import React from "react";
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { forgotPassword } from "../services/userServices";
import "../App.css"
export default class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            snackBarMessage: "",
            openSnackBar: false,
        };
    }
    handleEmailChange = event => {
        try {
            const email = event.target.value;
            this.setState({ email: email });
        } catch (err) {
            console.log("error at handleEmailChange in forgotPassword");
        }
    };
    handleSubmit = event => {
        try {
            event.preventDefault();
            if (this.state.email === "") {
                this.setState({
                    openSnackBar: true,
                    snackBarMessage: "Email is empty..!"
                });
            } else if (
                !/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.email)
            ) {
                this.setState({
                    openSnackBar: true,
                    snackBarMessage: " Not a valid email..!"
                });
            }
            else {
                var data = {
                    email: this.state.email
                }
                forgotPassword(data)
                    .then((response) => {
                        console.log(response);
                        this.setState({
                            openSnackBar: true,
                            snackBarMessage: " Kindly check your email.."
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                        this.setState({
                            openSnackBar: true,
                            snackBarMessage: " User is not found.."
                        });
                    });
            }
        } catch (err) {
            console.log("error at handleSubmit in forgotPassword");
        }
    };
            handleSnackClose = () => {
                try {
                    this.setState({
                        openSnackBar: false
                    })
                } catch (err) {
                    console.log("error at handleSnackClose in forgotPassword");
                }
            }
            loginclick = event => {
                try {
                    event.preventDefault();
                    this.props.history.push("/login");
                } catch (err) {
                    console.log("error at loginclick in forgotPassword");
                }
            };
    render() {
        return (
            <div>
                <div className="box_forgot">
                    <div id="statement1">
                        <h2>Forgot your password?</h2>
                    </div>
                    <p>To reset the password , type the full email address</p>
                    <div id="statement3">
                        <p> <b>Email address</b></p>
                    </div>
                    <div id="email-input-forgot">
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
                    <div id="submitbutton-forgot" >
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

                    </div>
                </div>
            
        );
    }
}
export { ForgotPassword }
