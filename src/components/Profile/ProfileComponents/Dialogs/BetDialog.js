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
import CancelBtn from "@material-ui/icons/AddCircle";
import MenuItem from "@material-ui/core/MenuItem";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import { createMuiTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker
} from "material-ui-pickers";
import PrimaryBtn from "../../../Widgets/PrimaryButton";
import PlayBookComponent from "./PBDialog";

const muiTheme = createMuiTheme({
  palette: {
    textColor: "red"
  }
});

const styles = theme => ({
  container: {
    background: "#14213D",
    padding: "none",
    width: 1260
  },
  margin: {
    margin: theme.spacing.unit
  },
  select: {
    color: "#14213D",
    fontSize: 30
  },
  helperText: {
    color: "#9e9e9e",
    fontSize: 12
  },
  title: {
    "& h2": {
      color: "white",
      fontFamily: "inherit",
      fontSize: 24,
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
    fontSize: 16,
    color: "white",
    textOverflow: "ellipsis !important",
    "&$cssFocused": {
      color: "#FCA311"
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
    color: "white",
    fontSize: 16,
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: "white",
      fontSize: 12
    }
  },
  notchedOutline: {},
  grid: {
    width: "60%"
  }
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
      quickColor: "#9e9e9e",
      playbook: "",
      playbookList: [],
      selectedDate: new Date(),
      playbookIsOpen: false
    };
    this.changeFormType = this.changeFormType.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getPlaybooks = this.getPlaybooks.bind(this);
    this.getPlaybooks();
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
    console.log(this.state.selectedDate);
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

  getPlaybooks() {
    fire
      .firestore()
      .collection(`users/${this.props.uid}/playbooks`)
      .get()
      .then(qSnap => {
        qSnap.forEach(doc => {
          console.log(doc.data().name);
          this.state.playbookList.push({
            value: doc.data().name,
            label: doc.data().name
          });
        });
        this.setState({
          playbook: this.state.playbookList[0].label
        });
      })
      .catch(e => {
        this.handleClose();
      });
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
    const { selectedDate } = this.state;

    let newPlaybook;

    if (this.state.playbookIsOpen) {
      newPlaybook = (
        <PlayBookComponent
          helperText={false}
          return={val => {
            this.state.playbook = val;
            this.state.playbookList.push({
              value: val,
              label: val
            });
            if (val !== null) {
              fire
                .firestore()
                .collection(`users/${this.props.uid}/playbooks`)
                .add({
                  name: val
                });
            }
          }}
          action={() => {
            this.setState({ playbookIsOpen: !this.state.playbookIsOpen });
          }}
        />
      );
    }

    return (
      <div>
        <Dialog
          maxWidth="lg"
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
                marginBottom: 15,
                width: "100%",
                borderStyle: "none none solid none",
                borderColor: "#E5E5E5",
                borderWidth: 1
              }}
            />
            <form onSubmit={this.createGame}>
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
                    margin="dense"
                    id="name"
                    label="Expected outcome"
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
                        notchedOutline: classes.notchedOutline,
                        input: classes.input
                      }
                    }}
                  />
                </div>
              </div>
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
                    margin="dense"
                    id="name"
                    label="Tournament/Event"
                    variant="outlined"
                    placeholder="Premier League"
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
                    id="outlined-select-currency"
                    select
                    label="Playbook"
                    className={classes.margin}
                    value={this.state.playbook}
                    onChange={this.handleChange("playbook")}
                    variant="outlined"
                    style={{ marginRight: 20, width: "40%", height: 40 }}
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
                    {this.state.playbookList.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <IconButton
                    onClick={() => this.setState({ playbookIsOpen: true })}
                    style={{
                      position: "absolute",
                      float: "right",
                      top: "20%",
                      color: "white",
                      transform: "scale(1.5)"
                    }}
                  >
                    <CancelBtn />
                  </IconButton>
                </div>
              </div>
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

                    width: "50%",
                    heigth: 50,
                    display: "table-cell"
                  }}
                >
                  <TextField
                    className={classes.margin}
                    margin="dense"
                    id="name"
                    label="Stake"
                    variant="outlined"
                    placeholder="100"
                    style={{ marginRight: 20, width: "30%" }}
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
                    margin="dense"
                    id="name"
                    label="Odds"
                    variant="outlined"
                    placeholder="1.5"
                    style={{ marginRight: 20, width: "30%" }}
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
                </div>
                <div
                  style={{
                    position: "relative",
                    textAlign: "start",
                    heigth: 50,
                    display: "table-cell",
                    width: "50%"
                  }}
                >
                  <TextField
                    className={classes.margin}
                    margin="dense"
                    id="name"
                    label="Site"
                    variant="outlined"
                    placeholder="Unibet"
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
                </div>
              </div>
              <div
                style={{
                  display: "table",
                  width: "100%",
                  tableLayout: "fixed",
                  height: 46,
                  textAlign: "center"
                }}
              >
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid
                    container
                    className={classes.grid}
                    style={{
                      position: "relative",
                      textAlign: "center",
                      width: "50%",
                      heigth: 50,
                      display: "table-cell"
                    }}
                  >
                    <DatePicker
                      margin="normal"
                      label="Date"
                      value={selectedDate}
                      onChange={this.handleDateChange}
                      style={{ marginRight: 30, width: "30%" }}
                      variant="outlined"
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
                    <TimePicker
                      margin="normal"
                      label="Time"
                      variant="outlined"
                      value={selectedDate}
                      onChange={this.handleDateChange}
                      style={{ marginRight: 10, width: "30%" }}
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
                  </Grid>
                </MuiPickersUtilsProvider>

                <div
                  style={{
                    position: "relative",
                    textAlign: "start",
                    heigth: 50,
                    display: "table-cell",
                    width: "50%"
                  }}
                >
                  <TextField
                    className={classes.margin}
                    margin="dense"
                    id="name"
                    label="Tags"
                    helperText="Insert tags so other users can find your bets, seperate words by using a comma"
                    variant="outlined"
                    placeholder="football, liverpool, everton"
                    style={{ marginRight: 20, width: "80%" }}
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
                    FormHelperTextProps={{
                      classes: {
                        root: classes.helperText
                      }
                    }}
                  />
                </div>
              </div>
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
                    textAlign: "left",
                    width: "6.5%",
                    heigth: 50,
                    display: "table-cell",
                    marginLeft: 20
                  }}
                />
                <div
                  style={{
                    position: "relative",
                    textAlign: "left",
                    width: "80git pu%",
                    heigth: 50,
                    display: "table-cell"
                  }}
                >
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Playbook"
                    className={classes.margin}
                    value={this.state.playbook}
                    onChange={this.handleChange("playbook")}
                    variant="outlined"
                    style={{ width: "16%", height: 40 }}
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
                    {this.state.playbookList.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </div>
              <DialogActions
                style={{ display: "flex", flexDirection: "column" }}
              >
                <button
                  id="submitBtn"
                  type="submit"
                  style={{
                    background: "none",
                    color: "inherit",
                    border: "none",
                    margin: 20,
                    font: "inherit",
                    cursor: "pointer",
                    outline: "inherit",
                    display: "inline-block"
                  }}
                >
                  <PrimaryBtn
                    to={"undefined"}
                    text="Create"
                    heigth={30}
                    width={260}
                    fontSize={20}
                  />
                </button>
                <Button
                  onClick={this.handleClose}
                  style={{
                    color: "white",
                    fontSize: 15,
                    fontFamily: "Inherit",
                    display: "inline-block"
                  }}
                >
                  Cancel
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
        {newPlaybook}
      </div>
    );
  }
}

export default withStyles(styles)(BetDialog);
