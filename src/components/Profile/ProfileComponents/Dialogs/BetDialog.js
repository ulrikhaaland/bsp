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
    width: 755
  },
  content: {},
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

class BetDialog extends React.Component {
  state = {
    open: true,
    bet: {
      amount: 300,
      sport: "football"
    }
  };

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

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Dialog
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
                className="provide_inputs"
                style={{
                  position: "relative",
                  display: "table-cell",
                  borderStyle: "solid solid solid solid",
                  borderWidth: 1,
                  background: "#FCA311"
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
                className="provide_inputs"
                style={{
                  position: "relative",
                  heigth: 50,
                  display: "table-cell",
                  textAlign: "center",
                  borderStyle: "solid solid solid solid",
                  borderWidth: 1,
                  background: "#9e9e9e"
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
                style={{
                  position: "relative",
                  heigth: 50,
                  display: "table-cell",
                  textAlign: "center",
                  borderStyle: "solid solid solid solid",
                  borderWidth: 1,
                  background: "#9e9e9e"
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
            <form onSubmit={null}>
              <DialogActions>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Email Address"
                  type="email"
                  fullWidth
                />
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
