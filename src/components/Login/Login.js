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

    this.changeFormType = this.changeFormType.bind(this);
    this.state = {
      open: true,
      email: "",
      password: "",
      username: "",
      btnOneText: "sign up",
      btnTwoText: "forgot password?",
      formType: "login",
      errorMSG: ""
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
    this.props.action();
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.action();
  };

  handleRequest(e) {
    e.preventDefault();
    console.log("worksss");
    switch (this.state.formType) {
      case "login":
        {
          fire
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(u => {
              this.props.proceed();
            })
            .catch(error => {
              console.log(error.message);

              this.setState({ errorMSG: error.message });
            });
        }
        break;
      case "sign up":
        {
          fire
            .auth()
            .createUserWithEmailAndPassword(
              this.state.email,
              this.state.password
            )
            .then(u => {
              this.props.proceed();
            })
            .catch(error => {
              console.log(error.message);
              this.setState({ errorMSG: error.message });
            });
        }
        break;
      case "forgot password?":
        {
          fire
            .auth()
            .sendPasswordResetEmail(this.state.email)
            .then(u => {})
            .catch(error => {
              console.log(error.message);
              this.setState({ errorMSG: error.message });
            });
        }
        break;
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
            formType: "login"
          });
        }
        break;
      case "sign up":
        {
          this.setState({
            btnOneText: "login",
            btnTwoText: "forgot password?",
            formType: "sign up"
          });
        }
        break;
      case "forgot password?": {
        this.setState({
          btnOneText: "login",
          btnTwoText: "sign up",
          formType: "forgot password?"
        });
      }
    }
  }

  render() {
    const { classes } = this.props;

    let nameTF = (
      <TextField
        margin="dense"
        id="username"
        label="Username"
        type="username"
        name="username"
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
        label="Email"
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
                {formBe}

                <p style={{ color: "white" }}>{this.state.errorMSG}</p>
                <button
                  id="submitBtn"
                  type="submit"
                  onClick={this.handleRequest.bind}
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
