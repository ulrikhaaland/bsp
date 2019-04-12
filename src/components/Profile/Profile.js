import React, { Component } from "react";
import "./Profile.css";
import {
  FloatingMenu,
  MainButton,
  ChildButton
} from "react-floating-button-menu";
import MdAdd from "@material-ui/icons/Add";
import MdClose from "@material-ui/icons/Clear";
import NewBetDialog from "../NewBetDialog/NewBetDialog";
import fire from "../../db/fire";
import SettingsBtn from "@material-ui/icons/Settings";
import IconButton from "@material-ui/core/IconButton";
import Person from "../../images/person.svg";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      user: {},
      name: ""
    };
    this.returnDialog = this.returnDialog.bind(this);
    this.logout = this.logout.bind(this);
    this.getuser = this.getuser.bind(this);
    this.getuser();
  }

  returnDialog() {
    if (this.state.isOpen) {
      return (
        <NewBetDialog
          action={() => this.setState({ isOpen: !this.state.isOpen })}
        />
      );
    }
  }

  getuser() {
    const user = fire.auth().currentUser;
    user.reload().then(() => {
      const refreshUser = fire.auth().currentUser;
      this.setState({ name: refreshUser.displayName });
      // do your stuff here
    });
  }

  logout(e) {
    e.preventDefault();
    console.log("worksss");
    fire
      .auth()
      .signOut()
      .then(u => {})
      .catch(error => {
        console.log(error);
      });
  }

  getStatus = (NewBetDialog, isOpen) => {
    this.state.isOpen = isOpen;
    this.setState();
    console.log("works");
  };

  render() {
    return (
      <div className="profile">
        <div className="profile_bg">
          <div className="left_container">
            <div className="profile_section">
              <img className="person" src={Person} alt="person" />
              <IconButton className="settings_btn">
                <SettingsBtn
                  style={{ color: "white", transform: "scale(1.8)" }}
                />
              </IconButton>

              <p>{this.state.name}</p>
            </div>
            <FloatingMenu
              className="fab"
              slideSpeed={500}
              direction="up"
              spacing={8}
              isOpen={this.state.isOpen}
            >
              <MainButton
                iconResting={
                  <MdAdd style={{ fontSize: 30 }} nativeColor="black" />
                }
                iconActive={
                  <MdClose style={{ fontSize: 30 }} nativeColor="black" />
                }
                backgroundColor="#FCA311"
                onClick={this.logout}
                // () => this.setState({ isOpen: !this.state.isOpen })
                size={56}
              />
            </FloatingMenu>
          </div>
        </div>
        {this.returnDialog()}
      </div>
    );
  }
}

export default Profile;
