import React, { Component } from "react";
import "./Toolbar.css";
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import UserIcon from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import firebase from "firebase";
import Login from "../Login/Login";

class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.routeChange = this.routeChange.bind(this);
    this.state.user = firebase.auth().currentUser;
  }

  state = {
    loggedIn: false,
    isOpen: false
  };

  routeChange(bypass) {
    if (this.props.auth !== null || bypass === true) {
      let path = `/profile`;
      this.props.history.push(path);
      this.state.loggedIn = true;
    } else {
      console.log("not");
      this.setState({ isOpen: !this.state.isOpen });
    }
  }

  render() {
    let backDrop;

    if (this.state.isOpen) {
      backDrop = (
        <Login
          action={() => this.setState({ isOpen: !this.state.isOpen })}
          proceed={this.routeChange.bind(this, true)}
        />
      );
    }
    return (
      <header className="toolbar">
        <nav className="toolbar__navigation">
          <div className="toolbar__toggle-button">
            <DrawerToggleButton click={this.props.drawerClickHandler} />
          </div>
          <div className="toolbar__logo">
            <NavLink
              className="toolbar__name"
              to="/"
              style={{ color: "#FCA311" }}
            >
              <div>Betting Spreadsheet</div>
            </NavLink>
          </div>
          <div className="spacer" />
          <div className="toolbar_navigation-items">
            <IconButton onClick={this.routeChange}>
              <UserIcon style={{ color: "white", transform: "scale(1.8)" }} />
            </IconButton>
          </div>
          {backDrop}
        </nav>
        <div className="elevation" />
      </header>
    );
  }
}

export default withRouter(Toolbar);
