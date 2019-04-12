import React, { Component } from "react";
import "./App.css";
// pages
import HomePage from "./components/HomePage/HomePage";
import Profile from "./components/Profile/Profile";

// route
import { BrowserRouter, Route, Switch } from "react-router-dom";
// menu
import Toolbar from "./components/Toolbar/Toolbar";
import SideDrawer from "./components/SideDrawer/SideDrawer";
import BackDrop from "./components/BackDrop/BackDrop";
import fire from "./db/fire";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideDrawerOpen: false,
      toolBarColor: "white",
      user: {},
      authenticated: false
    };
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("logged in");
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }

  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backDropClickHandler = () => {
    this.setState({
      sideDrawerOpen: false
    });
  };

  checkAuth() {
    return this.state.user;
  }

  render() {
    let backDrop;

    if (this.state.sideDrawerOpen) {
      backDrop = <BackDrop click={this.backDropClickHandler} />;
    }
    return (
      <BrowserRouter>
        <div>
          <Toolbar
            drawerClickHandler={this.drawerToggleClickHandler}
            toolBarColor={this.state.toolBarColor}
            auth={this.state.user}
          />
          <SideDrawer show={this.state.sideDrawerOpen} />
          {backDrop}
          <Switch>
            <Route path="/profile" component={Profile} />
            <Route path="/" component={HomePage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
