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
import PrimaryButton from "../../../Widgets/PrimaryButton";

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
  title: {
    "& h2": {
      color: "white",
      fontFamily: "inherit",
      fontSize: 20
    }
  },
  p: {
    color: "#9e9e9e",
    fontFamily: "inherit",
    fontSize: 12,
    marginBottom: 20
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

class PBDialog extends React.Component {
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
            New Playbook
          </DialogTitle>
          <DialogContent
            classes={{
              root: classes.content
            }}
          >
            <DialogContentText
              classes={{
                root: classes.p
              }}
            >
              Please create a playbook before adding your bets, e.g. "Football"
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="name"
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
            />
          </DialogContent>
          <form onSubmit={null}>
            <DialogActions
              classes={{
                root: classes.content
              }}
            >
              <button
                id="submitBtn"
                type="submit"
                onClick={null}
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
                  text={"Create"}
                  heigth={30}
                  width={260}
                  fontSize={20}
                />
              </button>
              <Button
                onClick={this.handleClose}
                style={{
                  color: "white",
                  fontFamily: "inherit",
                  marginBottom: 10
                }}
              >
                Cancel
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(PBDialog);
