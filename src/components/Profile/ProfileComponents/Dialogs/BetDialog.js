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
    background: "white",
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
            Subscribe
          </DialogTitle>
          <DialogContent
            classes={{
              root: classes.content
            }}
          >
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
          </DialogContent>
          <form onSubmit={null}>
            <DialogActions
              classes={{
                root: classes.content
              }}
            >
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleSubmit} color="primary">
                Subscribe
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(BetDialog);
