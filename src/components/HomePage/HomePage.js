import React, { Component } from "react";
import "./HomePage.css";

import Card from "../Widgets/Card";
import PrimaryButton from "../Widgets/PrimaryButton";

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
