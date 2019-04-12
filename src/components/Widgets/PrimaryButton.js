import React from "react";
import Fab from "@material-ui/core/Fab";
import { withRouter } from "react-router-dom";
import { width } from "window-size";

class PrimaryButton extends React.Component {
  render() {
    return (
      <div>
        <Fab
          onClick={this.handleSubmit}
          variant="extended"
          aria-label="Add"
          style={{
            backgroundColor: "#FCA311",
            color: "#14213D",
            fontWeight: "bold",
            zIndex: "100",

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
