import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import { withStyles } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import fire from "../../../../db/fire";
import CancelBtn from "@material-ui/icons/Cancel";

const styles = theme => ({
  container: {
    background: "#14213D",
    padding: "none",
    width: 860
  },
  margin: {
    margin: theme.spacing.unit
  },
  select: {
    color: "#14213D",
    fontSize: 30
  },
  title: {
    "& h2": {
      color: "white",
      fontFamily: "inherit",
      fontSize: 20,
      textAlign: "center"
    }
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
    fontSize: 15,
    color: "white",
    "&$cssFocused": {
      color: "#FCA311"
    },
    "&$placeholder": {
      color: "white"
    }
  },
  cssFocused: {},
  cssUnderline: {
    "&:after": {
      borderBottomColor: "#FCA311"
    }
  },
  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: "#FCA311"
    }
  },
  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: "white",
      fontSize: 12
    }
  },
  notchedOutline: {}
});

class BetDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      bet: {
        amount: 300,
        sport: "football"
      },
      inputColor: "#FCA311",
      connectColor: "#9e9e9e",
      quickColor: "#9e9e9e"
    };
    this.changeFormType = this.changeFormType.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClickOpen = () => {
    this.setState({ open: true });
    this.props.action();
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.action();
  };

  handleSubmit = e => {
    e.preventDefault();
    const userRef = fire
      .firestore()
      .collection("bets")
      .add({
        ...this.state.bet
      });
  };

  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  changeFormType(e) {
    switch (e) {
      case "input":
        {
          this.setState({
            inputColor: "#FCA311",
            connectColor: "#9e9e9e",
            quickColor: "#9e9e9e"
          });
        }
        break;
      case "connect":
        {
          this.setState({
            inputColor: "#9e9e9e",
            connectColor: "#FCA311",
            quickColor: "#9e9e9e"
          });
        }
        break;
      case "quick":
        {
          this.setState({
            inputColor: "#9e9e9e",
            connectColor: "#9e9e9e",
            quickColor: "#FCA311"
          });
        }
        break;
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Dialog
          disableBackdropClick={true}
          disableEscapeKeyDown={true}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          style={{
            borderStyle: "none none solid none"
          }}
          classes={{
            paper: classes.container
          }}
        >
          <DialogTitle
            id="form-dialog-title"
            classes={{
              root: classes.title
            }}
          >
            New Bet
          </DialogTitle>
          <DialogContent
            classes={{
              root: classes.content
            }}
          >
            <div
              style={{
                display: "table",
                width: "100%",
                tableLayout: "fixed",
                height: 46
              }}
            >
              <div
                name="input"
                className="provide_inputs"
                onClick={this.changeFormType.bind(this, "input")}
                style={{
                  position: "relative",
                  display: "table-cell",
                  borderStyle: "solid solid solid solid",
                  borderWidth: 1,
                  background: this.state.inputColor
                }}
              >
                <h2
                  style={{
                    position: "relative",
                    color: "white",
                    fontFamily: "inherit",
                    fontSize: 15,
                    marginTop: "15px",
                    verticalAlign: "middle",
                    textAlign: "center"
                  }}
                >
                  Provide Input
                </h2>
              </div>
              <div
                onClick={this.changeFormType.bind(this, "connect")}
                className="provide_inputs"
                style={{
                  position: "relative",
                  heigth: 50,
                  display: "table-cell",
                  textAlign: "center",
                  borderStyle: "solid solid solid solid",
                  borderWidth: 1,
                  background: this.state.connectColor
                }}
              >
                <h2
                  style={{
                    position: "relative",
                    color: "white",
                    fontFamily: "inherit",
                    fontSize: 15,
                    margin: 0,
                    marginTop: "15px"
                  }}
                >
                  Connect to game
                </h2>
              </div>
              <div
                className="provide_inputs"
                onClick={this.changeFormType.bind(this, "quick")}
                style={{
                  position: "relative",
                  heigth: 50,
                  display: "table-cell",
                  textAlign: "center",
                  borderStyle: "solid solid solid solid",
                  borderWidth: 1,
                  background: this.state.quickColor
                }}
              >
                <h2
                  style={{
                    position: "relative",
                    color: "white",
                    fontFamily: "inherit",
                    fontSize: 15,
                    margin: 0,
                    marginTop: "15px"
                  }}
                >
                  Quick
                </h2>
              </div>
            </div>
            <div
              style={{
                marginTop: 15,
                marginBottom: 5,
                width: "100%",
                borderStyle: "none none solid none",
                borderColor: "#E5E5E5",
                borderWidth: 1.5
              }}
            />
            <form onSubmit={null}>
              <div
                style={{
                  display: "table",
                  width: "100%",
                  tableLayout: "fixed",
                  height: 46,
                  textAlign: "center"
                }}
              >
                <div
                  style={{
                    position: "relative",
                    display: "inline-block",
                    heigth: 50,
                    display: "table-cell"
                  }}
                >
                  <TextField
                    className={classes.margin}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Game/Event"
                    variant="outlined"
                    placeholder="Liverpool-Everton"
                    style={{ marginRight: 20, width: "40%" }}
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
                        notchedOutline: classes.notchedOutline,
                        input: classes.input
                      }
                    }}
                  />
                  <TextField
                    className={classes.margin}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="What you played"
                    variant="outlined"
                    placeholder="Liverpool"
                    style={{ marginRight: 20, width: "40%" }}
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
                        notchedOutline: classes.notchedOutline
                      }
                    }}
                  />
                </div>
              </div>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.handleSubmit} color="primary">
                  Subscribe
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(BetDialog);
