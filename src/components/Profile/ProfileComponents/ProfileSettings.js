import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Switch from "@material-ui/core/Switch";
import WifiIcon from "@material-ui/icons/Visibility";
import MenuItem from "@material-ui/core/MenuItem";
import fire from "../../../db/fire";

const styles = {
  primaryText: {
    color: "#9e9e9e",
    fontFamily: "inherit",
    fontSize: 12
  },
  secondaryText: {
    color: "white",
    fontFamily: "inherit",
    fontSize: 15
  },
  redText: {
    color: "#f50057",
    fontFamily: "inherit",
    fontSize: 15
  },
  container: {
    background: "linear-gradient(to bottom, #1c222e 0, #333d54 100%)"
  },
  appBar: {
    position: "relative",
    backgroundColor: "#14213D"
  },
  flex: {
    flex: 1
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
    color: "#9e9e9e",
    fontFamily: "inherit",
    "&$cssFocused": {
      color: "#FCA311"
    }
  },
  cssFocused: {
    fontSize: 15
  },
  cssOutlinedInput: {
    color: "white",
    fontSize: 14,
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
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ProfileSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      user: this.props.user,
      description: "",
      checked: ["wifi"],
      currency: "EUR",
      currencyList: [
        {
          label: "EUR",
          value: "EURO"
        }
      ]
    };
    this.handleChange = this.handleChange.bind(this);
    this.state.description = this.state.user.description
  }

  handleClickOpen = () => {
    this.setState({ open: true });
    this.props.action();
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.action();
  };

  handleChange = e => {
    if (e.target.name === "description" && e.target.value.length >= 160) {
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };

  updateInfo() {
    fire.firestore().collection("users").doc(this.state.user.uid).update({

    })
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Dialog
          classes={{
            paper: classes.container
          }}
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={this.handleClose}
                aria-label="Close"
              >
                <CloseIcon style={{ transform: "scale(1.5)" }} />
              </IconButton>
              <Typography
                variant="h6"
                color="inherit"
                style={{ fontFamily: "inherit", fontSize: 20 }}
                className={classes.flex}
              >
                Profile Settings
              </Typography>
              <Button
                color="inherit"
                onClick={this.handleClose}
                style={{ fontFamily: "inherit", fontSize: 20 }}
              >
                save
              </Button>
            </Toolbar>
          </AppBar>
          <div style={{ paddingLeft: 16, paddingRight: 16 }}>
            <List>
              <ListItem>
                <ListItemText
                  classes={{
                    primary: classes.primaryText,
                    secondary: classes.secondaryText
                  }}
                  primary="Username"
                  secondary={this.state.user.name}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  style={{ paddingLeft: 0 }}
                  classes={{
                    primary: classes.primaryText,
                    secondary: classes.secondaryText
                  }}
                  primary="Email"
                  secondary={this.state.user.email}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <TextField
                  margin="dense"
                  id="name"
                  multiline={true}
                  rows={3}
                  label="Profile Description"
                  value={this.state.description}
                  name="description"
                  onChange={this.handleChange}
                  style={{ width: "40%" }}
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
              </ListItem>
              <Divider style={{ marginBottom: 80}} />
              <ListItem style={{ width: "20%" }}>
                {/* <ListItemIcon>
                  <WifiIcon
                    style={{ color: "white", transform: "scale(1.25)" }}
                  />
                </ListItemIcon> */}
                <ListItemText
                  primary="Public Profile"
                  classes={{
                    primary: classes.secondaryText
                  }}
                />

                <Switch
                  onChange={this.handleToggle("wifi")}
                  checked={this.state.checked.indexOf("wifi") !== -1}
                  classes={{
                    
                      color: "#FCA311"
                    
                  }}
                />
              </ListItem>
              <Divider />
              <ListItem style={{ width: "20%" }}>
                <ListItemText
                  primary="Currency"
                  classes={{
                    primary: classes.secondaryText
                  }}
                />
                <TextField
                  id="outlined-select-currency"
                  select
                  name="currency"
                  className={classes.margin}
                  value={this.state.currency}
                  onChange={this.handleChange}
                  style={{ width: "40%" }}
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
                >
                  {this.state.currencyList.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </ListItem>
              <Divider style={{ marginBottom: 80}} />
              <ListItem button>
              <ListItemText
              primary="Policies & Agreements"
              classes={{
                primary: classes.secondaryText
              }} ></ListItemText>
              </ListItem>
              <Divider />
              <ListItem button>
              <ListItemText
              primary="Log Out"
              classes={{
                primary: classes.redText
              }} ></ListItemText>
              </ListItem>
              <Divider />
              <ListItem button>
              <ListItemText
              primary="Delete Profile"
              classes={{
                primary: classes.redText
              }} ></ListItemText>
              </ListItem>
              <Divider />
            </List>
          </div>
        </Dialog>
      </div>
    );
  }
}

ProfileSettings.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileSettings);
