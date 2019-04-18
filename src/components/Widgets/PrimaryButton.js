import React from "react";
import Fab from "@material-ui/core/Fab";
import { withRouter } from "react-router-dom";
import { width } from "window-size";

class PrimaryButton extends React.Component {
  render() {
    let color;
    let textColor;
    console.log(this.props.color);
    if (this.props.color !== undefined) {
      color = this.props.color;
    } else {
      color = "#FCA311";
    }
    if (this.props.textColor !== undefined) {
      textColor = this.props.textColor;
    } else {
      textColor = "#14213D";
    }
    return (
      <div>
        <Fab
          onClick={this.handleSubmit}
          variant="extended"
          aria-label="Add"
          style={{
            backgroundColor: color,
            color: textColor,

            zIndex: "100",
            fontFamily: "inherit",
            width: this.props.width,
            height: this.props.height,
            fontSize: this.props.fontSize
          }}
        >
          {this.props.text}
        </Fab>
      </div>
    );
  }
}

export default withRouter(PrimaryButton);
