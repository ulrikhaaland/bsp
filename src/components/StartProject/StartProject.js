import React, { Component } from "react";
import "./StartProject.css";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import PrimaryButton from "../Widgets/PrimaryButton";
import SendIcon from "@material-ui/icons/Send";

const firebase = require("firebase");

var config = {
  apiKey: "AIzaSyC-yUFH7MgBsYchM6YHqnwUf3odTECU4pk",
  authDomain: "homepage-794ae.firebaseapp.com",
  databaseURL: "https://homepage-794ae.firebaseio.com",
  projectId: "homepage-794ae",
  storageBucket: "homepage-794ae.appspot.com",
  messagingSenderId: "723661811383"
};

firebase.initializeApp(config);

var firestore = firebase.firestore();

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing.unit
  },
  cssLabel: {
    fontSize: 20,
    "&$cssFocused": {
      color: "#634c91"
    }
  },
  cssFocused: {},
  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: "#634c91"
    }
  },
  notchedOutline: {},
  cssUnderline: {
    "&:after": {
      borderBottomColor: "#634c91"
    }
  }
});

const budgetRange = [
  {
    value: "0",
    label: ""
  },
  {
    value: "50",
    label: "50.000-150.000"
  },
  {
    value: "150",
    label: "150.000-300.000"
  },
  {
    value: "300",
    label: "300.000+"
  }
];

class StartProject extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  state = {
    budget: "",
    name: "",
    email: "",
    phone: "",
    budget: "",
    find: "",
    description: ""
  };

  handleInputChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
    console.log(event.target.value);
  };

  handleSubmit(event) {
    firestore
      .collection("projects")
      .add({
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
        budget: this.state.budget,
        find: this.state.find,
        description: this.state.description
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
    event.preventDefault();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="StartProject">
        <div className="page">
          <div className="page_intro">
            <h1>Kom i gang!</h1>
            <p>
              Vi vil gjerne høre hva du jobber med. Send oss et sammendrag så
              tar vi kontakt innen 24 timer.
            </p>
          </div>
          <div className="page_form">
            <form id="form" onSubmit={this.handleSubmit}>
              <TextField
                id="textField"
                label="Navn"
                className="textField"
                value={this.state.name}
                onChange={this.handleInputChange("name")}
                margin="normal"
                helperText=" "
                required
                fullWidth
                // InputLabelProps={{
                //   classes: {
                //     root: classes.cssLabel,
                //     focused: classes.cssFocused
                //   }
                // }}
                // InputProps={{
                //   classes: {
                //     root: classes.cssOutlinedInput,
                //     focused: classes.cssFocused,
                //     underline: classes.cssUnderline
                //   }
                // }}
              />
              <TextField
                id="textField"
                label="Email"
                className="textField"
                required
                fullWidth
                margin="normal"
                helperText=" "
                value={this.state.email}
                onChange={this.handleInputChange("email")}
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
                    underline: classes.cssUnderline
                  }
                }}
              />
              <TextField
                id="textField"
                label="Telefon"
                className="textField"
                required
                fullWidth
                margin="normal"
                helperText=" "
                value={this.state.phone}
                onChange={this.handleInputChange("phone")}
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
                    underline: classes.cssUnderline
                  }
                }}
              />
              <TextField
                id="select-budget"
                select
                label="Budsjettområde (NOK)"
                className={classes.textField}
                value={this.state.budget}
                fullWidth
                onChange={this.handleInputChange("budget")}
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
                    underline: classes.cssUnderline
                  }
                }}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                helperText="Hvor mye penger du er villig til å bruke på ditt prosjekt"
                margin="normal"
              >
                {" "}
                {budgetRange.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="textField"
                label="Hvordan fant du oss?"
                className="textField"
                required
                fullWidth
                helperText=" "
                onChange={this.handleInputChange("find")}
                margin="normal"
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
                    underline: classes.cssUnderline
                  }
                }}
              />
              <TextField
                id="textField"
                label="Beskriv ditt prosjekt"
                className="textField"
                required
                fullWidth
                multiline
                rows="6"
                margin="normal"
                helperText=" "
                value={this.state.description}
                onChange={this.handleInputChange("description")}
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
                    underline: classes.cssUnderline
                  }
                }}
              />
              <button id="submitBtn" type="submit">
                <PrimaryButton to={"undefined"} text={"Send"} icon={SendIcon} />
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(StartProject);
