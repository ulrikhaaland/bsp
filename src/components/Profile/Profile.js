import React, { Component } from "react";
import "./Profile.css";
import {
  FloatingMenu,
  MainButton,
  ChildButton
} from "react-floating-button-menu";
import MdAdd from "@material-ui/icons/Add";
import MdClose from "@material-ui/icons/Clear";
import BetDialog from "./ProfileComponents/Dialogs/BetDialog";
import PBDialog from "./ProfileComponents/Dialogs/PBDialog";
import fire from "../../db/fire";
import SettingsBtn from "@material-ui/icons/Settings";
import IconButton from "@material-ui/core/IconButton";
import Person from "../../images/person.svg";
import CircularProgress from "@material-ui/core/CircularProgress";
import GameStream from "./ProfileComponents/GameStream";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      user: null,
      active: [],
      all: [],
      isActive: true,
      name: "",
      desc: "",
      isLoading: true,
      bgFirst: "#FCA311",
      bgSecond: "#9e9e9e",
      playbooks: []
    };
    this.returnDialog = this.returnDialog.bind(this);
    this.logout = this.logout.bind(this);
    this.getUser = this.getUser.bind(this);
    this.authListener = this.authListener.bind(this);
    this.setGameBg = this.setGameBg.bind(this);
    this.openDialog = this.openDialog.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged(u => {
      if (u) {
        this.setState({ user: u });
        this.getUser();
        console.log(this.state.user.email);
      } else {
        this.setState({ user: null });
      }
    });
  }

  returnDialog() {
    if (this.state.isOpen && this.state.playbooks.length > 0) {
      return (
        <BetDialog
          action={() => this.setState({ isOpen: !this.state.isOpen })}
          uid={this.state.user.uid}
        />
      );
    } else if (this.state.isOpen) {
      return (
        <PBDialog
          helperText={true}
          action={() => {
            this.setState({ isOpen: !this.state.isOpen });
          }}
          uid={this.state.user.uid}
          return={val => {
            this.state.playbooks.push(val);
            this.setState({ isOpen: true });
          }}
        />
      );
    }
  }

  getUser() {
    fire
      .firestore()
      .collection("users")
      .doc(this.state.user.uid)
      .get()
      .then(doc => {
        if (doc.exists) {
          this.setState({
            name: doc.data().name,
            desc: doc.data().description
          });
        }
      });
    fire
      .firestore()
      .collection(`users/${this.state.user.uid}/all`)
      .get()
      .then(qSnap => {
        qSnap.forEach(doc => {
          console.log(doc.data());
          this.state.all.push(doc.data());
        });
        this.setState({ isLoading: false });
      });
    fire
      .firestore()
      .collection(`users/${this.state.user.uid}/active`)
      .get()
      .then(qSnap => {
        qSnap.forEach(doc => {
          console.log(doc.data());
          this.state.active.push(doc.data());
        });
      });
    fire
      .firestore()
      .collection(`users/${this.state.user.uid}/playbooks`)
      .get()
      .then(qSnap => {
        qSnap.forEach(doc => {
          this.state.playbooks.push(doc.data());
        });
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
    this.props.history.push("/");
  }

  getStatus = (NewBetDialog, isOpen) => {
    this.state.isOpen = isOpen;
    this.setState();
    console.log("works");
  };

  setGameBg(name) {
    if (name === "bgFirst") {
      this.setState({
        bgFirst: "#FCA311",
        bgSecond: "#9e9e9e"
      });
    } else if (name === "bgSecond") {
      this.setState({
        bgFirst: "#9e9e9e",
        bgSecond: "#FCA311"
      });
    }
  }

  openDialog() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    let games;

    let dialog;

    // if(this.state.playbooks.length > 1) {
    //   dialog =
    // } else {
    //   dialog
    // }

    if (this.state.user !== null) {
      console.log(this.state.user);
      games = <GameStream gamePath={`users/${this.state.user.uid}/active`} />;
    } else {
      games = <p>32asdasd</p>;
    }

    let loading;

    if (this.state.isLoading) {
      loading = (
        <CircularProgress
          style={{
            zIndex: 300,
            color: "#E5E5E5",
            position: "fixed",
            top: "50%",
            left: " 50%"
          }}
        />
      );
    }
    return (
      <div className="profile">
        <div className="profile_bg">
          {loading}
          <div className="page_content">
            <div className="left_container">
              <div className="profile_section">
                <div className="not_info">
                  <img className="person" src={Person} alt="person" />
                  <IconButton className="settings_btn" onClick={this.logout}>
                    <SettingsBtn
                      style={{ color: "white", transform: "scale(1.5)" }}
                    />
                  </IconButton>
                </div>
                <div className="profile_info">
                  <p style={{ color: "#9e9e9e" }}>{"@" + this.state.name}</p>
                  <p style={{ color: "white" }}>{this.state.desc}</p>
                </div>
              </div>
              <div className="border_profile" />
              <div className="choose_game">
                <div
                  className="choose_game_firstsplit"
                  style={{ background: this.state.bgFirst }}
                  onClick={this.setGameBg.bind(this, "bgFirst")}
                >
                  <p>In-Play</p>
                </div>
                <div
                  className="choose_game_secondsplit"
                  style={{ background: this.state.bgSecond }}
                  onClick={this.setGameBg.bind(this, "bgSecond")}
                >
                  <p>History</p>
                </div>
              </div>
              <div className="game_section">{games}</div>
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
                  onClick={() => {
                    if (!this.state.isLoading) {
                      this.setState({ isOpen: !this.state.isOpen });
                    }
                  }}
                  size={56}
                />
              </FloatingMenu>
            </div>
          </div>
        </div>
        {this.returnDialog()}
      </div>
    );
  }
}

export default Profile;
