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
    width: 312,
    textAlign: "center"
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

class WarningDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      text: props.text,
      helperText: props.helperText,
      btnText: props.btnText
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

  handleChange(e) {
    this.setState({ name: e.target.value });
  }

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
            {this.state.text}
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
              {this.state.helperText}
            </DialogContentText>
          </DialogContent>

          <DialogActions
            classes={{
              root: classes.content
            }}
          >
            <button
              id="submitBtn"
              onClick={this.props.event}
              style={{
                background: "none",
                color: "#f50057",
                border: "none",
                marginBottom: 20,
                font: "inherit",
                cursor: "pointer",
                outline: "inherit"
              }}
            >
              <PrimaryButton
                to={"undefined"}
                text={this.state.btnText}
                heigth={30}
                width={260}
                fontSize={20}
                color="#f50057"
                textColor="black"
              />
            </button>
          </DialogActions>

          <Button
            onClick={this.handleClose}
            style={{
              color: "white",
              fontFamily: "inherit",
              marginBottom: 10,
              fontSize: 12
            }}
          >
            Cancel
          </Button>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(WarningDialog);
