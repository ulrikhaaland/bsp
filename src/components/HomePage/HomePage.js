import React, { Component } from "react";
import "./HomePage.css";
import Macbook from "../../images/macbook.png";
import Card from "../Widgets/Card";
import PrimaryButton from "../Widgets/PrimaryButton";
import IPhone from "../../images/iphone.png";
import WhiteBoard from "../../images/whiteboard.jpg";
import AddCirceIcon from "@material-ui/icons/AddCircleOutlineRounded";
import { NavLink } from "react-router-dom";

class HomePage extends Component {
  render() {
    return (
      <div className="homepage">
        <div className="homepage-first">
          <div className="bg-container" />
        </div>
      </div>
    );
  }
}

export default HomePage;
