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

class Profile extends Component {
  constructor(props) {
    super(props);
    this.returnDialog = this.returnDialog.bind(this);
    this.logout = this.logout.bind(this);
  }
  state = {
    isOpen: false
  };

  returnDialog() {
    if (this.state.isOpen) {
      return (
        <NewBetDialog
          action={() => this.setState({ isOpen: !this.state.isOpen })}
        />
      );
    }
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
          <div className="content">
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
