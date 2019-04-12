import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import { withStyles } from "@material-ui/core/styles";

import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import fire from "../../db/fire";
import { root } from "postcss";
import { underline } from "ansi-colors";
import PrimaryButton from "../Widgets/PrimaryButton";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  container: {
    background: "#14213D",

    margin: "auto",
    width: "fit-content",
    alignItems: "center"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    margin: "auto"
  },
  select: {
    color: "#14213D",
    fontSize: 30
  },
  underline: {
    "&:hover": {
      "&:before": {
        borderBottom: ["white", "!important"]
      }
    },
    "&:before": {
      borderBottom: "#FCA311"
    },
    "&:after": {
      borderBottomColor: "#FCA311"
    }
  },

  cssLabel: {
    fontSize: 20,
    color: "white",
    "&$cssFocused": {
      color: "#FCA311"
    }
  },
  cssFocused: {
    fontSize: 20
  },
  cssOutlinedInput: {
    color: "white",
    fontSize: 16,
    "&$cssFocused $notchedOutline": {
      borderColor: "#FCA311"
    }
  },
  notchedOutline: {},
  cssUnderline: {
    color: "white",
    "&:after": {
      borderBottomColor: "#FCA311"
    }
  }
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRequest = this.handleRequest.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.proceed = this.proceed.bind(this);
    this.changeFormType = this.changeFormType.bind(this);
    this.signUp = this.signUp.bind(this);
    this.state = {
      open: true,
      email: "",
      password: "",
      username: "",
      btnOneText: "sign up",
      btnTwoText: "forgot password?",
      formType: "login",
      errorMSG: "",
      emailLabel: "Email/Username",
      usernameError: false,
      usernameErrorTxt: "",
      cleared: false,
      loading: false
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
    this.props.action();
  };

  handleClose = () => {
    this.setState({ open: false, loading: false });
    this.props.action();
  };

  signUp(withName) {
    let altEmail;
    withName ? (altEmail = this.state.username) : (altEmail = this.state.email);
    fire
      .auth()
      .signInWithEmailAndPassword(altEmail, this.state.password)
      .then(u => {
        this.proceed();
      })
      .catch(error => {
        console.log(error.message);

        this.setState({ errorMSG: error.message, loading: false });
      });
  }

  handleRequest(e) {
    e.preventDefault();
    this.setState({ loading: true });
    switch (this.state.formType) {
      case "login":
        {
          if (!this.state.email.includes("@")) {
            fire
              .firestore()
              .collection("usernames")
              .where("username", "==", this.state.email)
              .get()
              .then(qSnap => {
                if (!qSnap.empty) {
                  qSnap.forEach(snap => {
                    console.log(snap.data().email);
                    this.state.username = snap.data().email;
                  });
                }
                this.signUp(true);
              });
          } else {
            this.signUp();
          }
        }
        break;
      case "sign up":
        {
          if (this.state.cleared) {
            fire
              .auth()
              .createUserWithEmailAndPassword(
                this.state.email,
                this.state.password
              )
              .then(u => {
                fire
                  .firestore()
                  .collection("usernames")
                  .add({
                    username: this.state.username,
                    email: this.state.email
                  });
                console.log(u.user.uid);
                fire
                  .firestore()
                  .collection("users")
                  .doc(u.user.uid)
                  .set({
                    name: this.state.username,
                    email: this.state.email,
                    description: ""
                  });

                this.proceed();
              })
              .catch(error => {
                console.log(error.message);
                this.setState({ errorMSG: error.message, loading: false });
              });
          } else {
            this.setState({ loading: false });
          }
        }
        break;
      case "forgot password?":
        {
          fire
            .auth()
            .sendPasswordResetEmail(this.state.email)
            .then(u => {
              this.setState({
                formType: "login",
                errorMSG: "A password reset link has been sent to your email",
                loading: false
              });
            })
            .catch(error => {
              console.log(error.message);
              this.setState({ errorMSG: error.message, loading: false });
            });
        }
        break;
    }
  }

  proceed() {
    this.setState({ open: false, loading: false });
    this.props.proceed();
  }

  handleChange(e) {
    if (e.target.name == "username" && e.target.value.length === 18) {
      console.log("max length");
    } else if (e.target.name == "username") {
      this.state.cleared = false;
      fire
        .firestore()
        .collection("usernames")
        .where("username", "==", e.target.value)
        .get()
        .then(qSnap => {
          if (!qSnap.empty) {
            console.log("taken");
            this.setState({
              usernameError: true,
              usernameErrorTxt: "Username is taken!",
              loading: false
            });
          } else {
            this.setState({
              usernameError: false,
              usernameErrorTxt: "",
              cleared: true
            });
          }
        });
      this.setState({ [e.target.name]: e.target.value });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  changeFormType(e) {
    this.state.errorMSG = "";
    console.log(e);
    switch (e) {
      case "login":
        {
          this.setState({
            btnOneText: "sign up",
            btnTwoText: "forgot password?",
            formType: "login",
            emailLabel: "Email/Username"
          });
        }
        break;
      case "sign up":
        {
          this.setState({
            btnOneText: "login",
            btnTwoText: "forgot password?",
            formType: "sign up",
            emailLabel: "Email"
          });
        }
        break;
      case "forgot password?": {
        this.setState({
          btnOneText: "login",
          btnTwoText: "sign up",
          formType: "forgot password?",
          emailLabel: "Email"
        });
      }
    }
  }

  render() {
    const { classes } = this.props;

    let isLoading;

    let nameTF = (
      <TextField
        margin="dense"
        id="username"
        label="Username"
        type="username"
        name="username"
        helperText={this.state.usernameErrorTxt}
        error={this.state.usernameError}
        required
        style={{
          margin: 10
        }}
        value={this.state.username}
        onChange={this.handleChange}
        fullWidth
        InputLabelProps={{
          classes: {
            root: classes.cssLabel,
            focused: classes.cssFocused
          }
        }}
        InputProps={{
          classes: {
            root: classes.cssOutlinedInput,
            focused: classes.cssFocused,
            underline: classes.underline
          }
        }}
        SelectProps={{
          root: classes.select,
          select: classes.select
        }}
      />
    );

    let pwTF = (
      <TextField
        margin="dense"
        id="password"
        label="Password"
        type="password"
        name="password"
        required
        value={this.state.password}
        onChange={this.handleChange}
        fullWidth
        style={{
          margin: 10
        }}
        InputLabelProps={{
          classes: {
            root: classes.cssLabel,
            focused: classes.cssFocused
          }
        }}
        InputProps={{
          classes: {
            root: classes.cssOutlinedInput,
            focused: classes.cssFocused,
            underline: classes.underline
          }
        }}
        SelectProps={{
          root: classes.select,
          select: classes.select
        }}
      />
    );

    let emailTF = (
      <TextField
        style={{
          background: "none",
          color: "inherit",
          border: "none",

          font: "inherit",
          cursor: "pointer",
          outline: "inherit"
        }}
        required
        margin="dense"
        id="email"
        label={this.state.emailLabel}
        type="email"
        name="email"
        fullWidth
        style={{
          margin: 10
        }}
        value={this.state.email}
        onChange={this.handleChange}
        InputLabelProps={{
          classes: {
            root: classes.cssLabel,
            focused: classes.cssFocused
          }
        }}
        InputProps={{
          classes: {
            root: classes.cssOutlinedInput,
            focused: classes.cssFocused,
            underline: classes.underline
          }
        }}
      />
    );

    let formBe;

    switch (this.state.formType) {
      case "login":
        {
          formBe = [emailTF, pwTF];
        }
        break;
      case "sign up":
        {
          formBe = [nameTF, emailTF, pwTF];
        }
        break;
      case "forgot password?": {
        formBe = emailTF;
      }
    }

    if (this.state.loading) {
      isLoading = (
        <CircularProgress
          style={{ zIndex: 300, color: "#E5E5E5", position: "fixed" }}
        />
      );
    }

    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          classes={{
            paper: classes.container
          }}
        >
          <DialogContent
            classes={{
              root: classes.content
            }}
          >
            {/* <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText> */}
            <form onSubmit={this.login}>
              <DialogActions
                classes={{
                  root: classes.content
                }}
              >
                {isLoading}
                {formBe}

                <p style={{ color: "white" }}>{this.state.errorMSG}</p>
                <button
                  id="submitBtn"
                  type="submit"
                  onClick={this.handleRequest.bind()}
                  style={{
                    background: "none",
                    color: "inherit",
                    border: "none",
                    margin: 20,
                    font: "inherit",
                    cursor: "pointer",
                    outline: "inherit"
                  }}
                >
                  <PrimaryButton
                    to={"undefined"}
                    text={this.state.formType}
                    heigth={30}
                    width={260}
                    fontSize={20}
                  />
                </button>
              </DialogActions>
            </form>

            <Button
              onClick={this.changeFormType.bind(this, this.state.btnOneText)}
              style={{
                color: "white",
                fontSize: 15,
                fontFamily: "Inherit"
              }}
            >
              {this.state.btnOneText}
            </Button>
            <Button
              onClick={this.changeFormType.bind(this, this.state.btnTwoText)}
              style={{
                color: "white",
                margin: 5,
                fontSize: 15,
                fontFamily: "Inherit"
              }}
            >
              {this.state.btnTwoText}
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(Login);
